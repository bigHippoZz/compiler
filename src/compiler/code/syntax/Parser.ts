import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { Lex } from "./Lexer";
import { LiteralExpressionSyntax } from "./LiteralExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./ParenthesizedExpressionSyntax";
import { SyntaxFacts } from "./SyntaxFacts";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxTree } from "./SyntaxTree";
import { UnaryExpressionSyntax } from "./UnaryExpressionSyntax";
import { DiagnosticsBag } from "../DiagnosticsBag";
import { AssignmentExpressionSyntax } from "./AssignmentExpressionSyntax";
import { NamedExpressionSyntax } from "./NamedExpressionSyntax";

export class Parser {
	private _syntaxTokens: SyntaxToken[] = [];

	private diagnostics: DiagnosticsBag = new DiagnosticsBag();

	private _position: number = 0;

	constructor(private _input: string) {
		let lexer: Lex = new Lex(this._input);
		let token: SyntaxToken;
		do {
			token = lexer.nextToken();
			if (
				token.kind !== SyntaxKind.BadToken &&
				token.kind !== SyntaxKind.WhiteSpaceToken
			) {
				this._syntaxTokens.push(token);
			}
		} while (token.kind !== SyntaxKind.EndOfFileToken);

		// this.diagnostics.push(...lexer.diagnostics);

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

	private parseBinaryExpression(parentPrecedence: number = 0) {
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

	private parseExpression() {
		return this.parseAssignmentExpression();
	}

	private parseAssignmentExpression(): ExpressionSyntax {
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

	private parsePrimaryExpression(): ExpressionSyntax {
		switch (this.current.kind) {
			case SyntaxKind.OpenParenthesesToken:
				const left = this.nextToken();
				const expression = this.parseExpression();
				const right = this.matchToken(SyntaxKind.CloseParenthesesToken);
				return new ParenthesizedExpressionSyntax(
					left,
					expression,
					right
				);

			case SyntaxKind.TrueKeyword:
			case SyntaxKind.FalseKeyword:
				const value = this.current.kind === SyntaxKind.TrueKeyword;
				const keywordsToken = this.nextToken();
				return new LiteralExpressionSyntax(keywordsToken, value);

			case SyntaxKind.IdentifierToken:
				const identifierToken = this.nextToken();
				return new NamedExpressionSyntax(identifierToken);

			default:
				const numberToken = this.matchToken(SyntaxKind.NumberToken);
				return new LiteralExpressionSyntax(numberToken);
		}
	}

	public parse() {
		// ( a + b ) * c
		const expression = this.parseExpression();
		const endOfFileToken = this.matchToken(SyntaxKind.EndOfFileToken);
		return new SyntaxTree(this.diagnostics, expression, endOfFileToken);
	}
}
