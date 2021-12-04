import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { LiteralExpressionSyntax } from "./LiteralExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./ParenthesizedExpressionSyntax";
import { SyntaxFacts } from "./SyntaxFacts";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";
import { UnaryExpressionSyntax } from "./UnaryExpressionSyntax";
import { DiagnosticsBag } from "../DiagnosticsBag";
import { AssignmentExpressionSyntax } from "./AssignmentExpressionSyntax";
import { NamedExpressionSyntax } from "./NamedExpressionSyntax";
import { Lex } from "./Lexer";
import { SourceText } from "../text/SourceText";
import { CompilationUnitSyntax } from "./CompilationUnitSyntax";
import { StatementSyntax } from "./StatementSyntax";
import { ExpressionStatementSyntax } from "./ExpressionStatementSyntax";
import { BlockStatementSyntax } from "./BlockStatementSyntax";
import { VariableDeclarationSyntax } from "./VariableDeclarationSyntax";
import { IfStatementSyntax } from "./IfStatementSyntax";
import { ElseClauseSyntax } from "./ElseClauseSyntax";

export class Parser {
	private _syntaxTokens: SyntaxToken[] = [];

	public diagnostics: DiagnosticsBag = new DiagnosticsBag();

	private _position: number = 0;

	constructor(private _input: SourceText) {
		let lexer: Lex = new Lex(this._input);
		let token: SyntaxToken;
		do {
			token = lexer.lex();
			if (
				token.kind !== SyntaxKind.BadToken &&
				token.kind !== SyntaxKind.WhiteSpaceToken
			) {
				this._syntaxTokens.push(token);
			}
		} while (token.kind !== SyntaxKind.EndOfFileToken);

		this.diagnostics.addRange(lexer.diagnostics);
	}

	private get current() {
		return this.peek(0);
	}

	private peek(offset: number) {
		const index = this._position + offset;

		if (index >= this._syntaxTokens.length) {
			return this._syntaxTokens[this._syntaxTokens.length - 1];
		}

		return this._syntaxTokens[index];
	}

	private next() {
		this._position++;
	}

	private nextToken() {
		const current = this.current;
		this.next();
		return current;
	}

	private matchToken(kind: SyntaxKind) {
		if (this.current.kind === kind) {
			return this.nextToken();
		}

		this.diagnostics.reportUnexpectedToken(
			this.current.span,
			this.current.kind,
			kind
		);

		return new SyntaxToken(kind, this.current.position, null, null);
	}

	////////////////////////////////////////////////////////////////
	// STATEMENT
	////////////////////////////////////////////////////////////////

	private parseStatement(): StatementSyntax {
		switch (this.current.kind) {
			case SyntaxKind.OpenBraceToken:
				return this.parseBlockStatement();
			case SyntaxKind.VarKeyword:
			case SyntaxKind.LetKeyword:
				return this.parseVariableDeclaration();

			case SyntaxKind.IfKeyword:
				return this.parseIfStatement();

			default:
				return this.parseExpressionStatement();
		}
	}

	private parseBlockStatement() {
		const statements: Array<StatementSyntax> = [];

		const openBraceToken = this.matchToken(SyntaxKind.OpenBraceToken);
		/**
		 * 判断当前的字符是不是结束符 或者是closeBraceToken
		 * 进行递归结束
		 */
		while (
			this.current.kind !== SyntaxKind.CloseBraceToken &&
			this.current.kind !== SyntaxKind.EndOfFileToken
		) {
			const statement = this.parseStatement();
			statements.push(statement);
		}
		const closeBraceToken = this.matchToken(SyntaxKind.CloseBraceToken);
		return new BlockStatementSyntax(
			openBraceToken,
			statements,
			closeBraceToken
		);
	}

	/**
	 * 解析二进制的声明语句
	 * @returns
	 */
	private parseExpressionStatement(): ExpressionStatementSyntax {
		const expression = this.parseExpression();
		return new ExpressionStatementSyntax(expression);
	}

	private parseVariableDeclaration(): VariableDeclarationSyntax {
		const expected =
			this.current.kind === SyntaxKind.LetKeyword
				? SyntaxKind.LetKeyword
				: SyntaxKind.VarKeyword;
		const keyword = this.matchToken(expected);
		const identifier = this.matchToken(SyntaxKind.IdentifierToken);
		const equalsToken = this.matchToken(SyntaxKind.EqualsToken);
		const initializer = this.parseExpression();
		return new VariableDeclarationSyntax(
			keyword,
			identifier,
			equalsToken,
			initializer
		);
	}

	private parseIfStatement(): IfStatementSyntax {
		const keyword = this.matchToken(SyntaxKind.IfKeyword);
		const condition = this.parseExpression();
		const statement = this.parseStatement();
		// null
		const elseClause = this.parseElseClause();

		return new IfStatementSyntax(keyword, condition, statement, elseClause);
	}

	private parseElseClause(): Nullable<ElseClauseSyntax> {
		if (this.current.kind !== SyntaxKind.ElseKeyword) {
			return null;
		}

		const keyword = this.nextToken();

		const statement = this.parseStatement();

		return new ElseClauseSyntax(keyword, statement);
	}

	////////////////////////////////////////////////////////////////
	// EXPRESSION
	////////////////////////////////////////////////////////////////
	private parseExpression(): ExpressionSyntax {
		return this.parseAssignmentExpression();
	}

	private parseAssignmentExpression():
		| AssignmentExpressionSyntax
		| ExpressionSyntax {
		if (
			this.peek(0).kind === SyntaxKind.IdentifierToken &&
			this.peek(1).kind === SyntaxKind.EqualsToken
		) {
			const identifierToken = this.nextToken();
			const operatorToken = this.nextToken();
			const right = this.parseAssignmentExpression();
			return new AssignmentExpressionSyntax(
				identifierToken,
				operatorToken,
				right
			);
		}
		return this.parseBinaryExpression();
	}

	private parseBinaryExpression(
		parentPrecedence: number = 0
	): ExpressionSyntax {
		let left: ExpressionSyntax;
		const unaryOperatorPrecedence = SyntaxFacts.getUnaryOperatorPrecedence(
			this.current.kind
		);

		if (
			unaryOperatorPrecedence !== 0 &&
			unaryOperatorPrecedence >= parentPrecedence
		) {
			const operatorToken = this.nextToken();
			const operand = this.parseBinaryExpression(unaryOperatorPrecedence);
			left = new UnaryExpressionSyntax(operatorToken, operand);
		} else {
			left = this.parsePrimaryExpression();
		}

		while (true) {
			const precedence = SyntaxFacts.getBinaryOperatorPrecedence(
				this.current.kind
			);

			if (precedence === 0 || precedence <= parentPrecedence) {
				break;
			}

			const operatorToken = this.nextToken();

			const right = this.parseBinaryExpression(precedence);

			left = new BinaryExpressionSyntax(left, operatorToken, right);
		}
		return left;
	}

	private parsePrimaryExpression(): ExpressionSyntax {
		switch (this.current.kind) {
			case SyntaxKind.OpenParenthesesToken:
				return this.parseParenthesizedExpression();

			case SyntaxKind.TrueKeyword:
			case SyntaxKind.FalseKeyword:
				return this.parseBooleanLiteral();

			case SyntaxKind.NumberToken:
				return this.parseNumberExpression();

			case SyntaxKind.IdentifierToken:
			default:
				return this.parseNameExpression();
		}
	}

	private parseParenthesizedExpression(): ParenthesizedExpressionSyntax {
		const left = this.matchToken(SyntaxKind.OpenParenthesesToken);
		const expression = this.parseExpression();
		const right = this.matchToken(SyntaxKind.CloseParenthesesToken);
		return new ParenthesizedExpressionSyntax(left, expression, right);
	}

	private parseBooleanLiteral(): LiteralExpressionSyntax {
		const isTrue = this.current.kind === SyntaxKind.TrueKeyword;
		const keywordsToken = isTrue
			? this.matchToken(SyntaxKind.TrueKeyword)
			: this.matchToken(SyntaxKind.FalseKeyword);
		return new LiteralExpressionSyntax(keywordsToken, isTrue);
	}

	private parseNumberExpression(): LiteralExpressionSyntax {
		const numberToken = this.matchToken(SyntaxKind.NumberToken);
		return new LiteralExpressionSyntax(numberToken);
	}

	private parseNameExpression(): NamedExpressionSyntax {
		const identifierToken = this.matchToken(SyntaxKind.IdentifierToken);
		return new NamedExpressionSyntax(identifierToken);
	}

	public parseCompilationUnit(): CompilationUnitSyntax {
		// const expression = this.parseExpression();
		const statement = this.parseStatement();

		const endOfFileToken = this.matchToken(SyntaxKind.EndOfFileToken);

		return new CompilationUnitSyntax(statement, endOfFileToken);
	}
}
