import { BoundWhileStatement } from "./BoundWhileStatement";
import { ExpressionSyntax } from "../syntax/ExpressionSyntax";
import { SyntaxKind } from "../syntax/SyntaxKind";
import { UnaryExpressionSyntax } from "../syntax/UnaryExpressionSyntax";
import { LiteralExpressionSyntax } from "../syntax/LiteralExpressionSyntax";
import { BinaryExpressionSyntax } from "../syntax/BinaryExpressionSyntax";
import { BoundExpression } from "./BoundExpression";
import { BoundLiteralExpression } from "./BoundLiteralExpression";
import { BoundUnaryExpression } from "./BoundUnaryExpression";
import { BoundBinaryExpression } from "./BoundBinaryExpression";
import { BoundUnaryOperator } from "./BoundUnaryOperator";
import { BoundBinaryOperator } from "./BoundBinaryOperator";
import { DiagnosticsBag } from "../DiagnosticsBag";
import { ParenthesizedExpressionSyntax } from "../syntax/ParenthesizedExpressionSyntax";
import { NamedExpressionSyntax } from "../syntax/NamedExpressionSyntax";
import { AssignmentExpressionSyntax } from "../syntax/AssignmentExpressionSyntax";
import { BoundVariableExpression } from "./BoundVariableExpression";
import { BoundAssignmentExpression } from "./BoundAssignmentExpression";
import { VariableSymbol } from "../VariableSymbol";
import { BoundScope } from "./BoundScope";
import { BoundGlobalScope } from "./BoundGlobalScope";
import { CompilationUnitSyntax } from "../syntax/CompilationUnitSyntax";
import { BlockStatementSyntax } from "../syntax/BlockStatementSyntax";
import { ExpressionStatementSyntax } from "../syntax/ExpressionStatementSyntax";
import { BoundStatement } from "./BoundStatement";
import { BoundVariableDeclaration } from "./BoundVariableDeclaration";
import { BoundBlockStatement } from "./BoundBlockStatement";
import { BoundExpressionStatement } from "./BoundExpressionStatement";
import { VariableDeclarationSyntax } from "../syntax/VariableDeclarationSyntax";
import { IfStatementSyntax } from "../syntax/IfStatementSyntax";
import { BoundIfStatement } from "./BoundIfStatement";
import { WhileStatementSyntax } from "../syntax/WhileStatementSyntax";

export class Binder {
	private readonly _diagnostics: DiagnosticsBag = new DiagnosticsBag();

	private _scope: BoundScope;

	constructor(private parent: BoundScope | null) {
		this._scope = new BoundScope(this.parent);
	}

	public get diagnostics(): DiagnosticsBag {
		return this._diagnostics;
	}

	// ast  => compilationUnit => bind
	public static bindGlobalScope(
		syntax: CompilationUnitSyntax,
		previous: BoundGlobalScope | null
	): BoundGlobalScope {
		const parentScope = this.createParentScope(previous);

		console.log("[ParentScope]", parentScope);

		const binder = new Binder(parentScope);

		const expression = binder.bindStatement(syntax.statement);

		const variables = binder._scope.getDeclareVariables();

		let diagnostics = DiagnosticsBag.fromArray(binder._diagnostics);
		// 连接 diagnostics
		if (previous !== null) {
			diagnostics = diagnostics.concat(previous.diagnostics);
		}
		return new BoundGlobalScope(
			previous,
			diagnostics,
			variables,
			expression
		);
	}

	public static createParentScope(
		previous: BoundGlobalScope | null
	): BoundScope | null {
		const stack: Array<BoundGlobalScope> = [];

		while (previous !== null) {
			stack.push(previous);
			previous = previous.previous;
		}

		let parent: BoundScope | null = null;

		while (stack.length) {
			previous = stack.pop()!;
			const scope: BoundScope = new BoundScope(parent);
			for (const v of previous.variables) {
				scope.tryDeclare(v);
			}
			parent = scope;
		}
		return parent;
	}

	////////////////////////////////////////////////////////////////
	// STATEMENT 语句
	////////////////////////////////////////////////////////////////

	public bindStatement(syntax: ExpressionSyntax): BoundStatement {
		switch (syntax.kind) {
			case SyntaxKind.BlockStatement:
				return this.bindBlockStatement(syntax as BlockStatementSyntax);

			case SyntaxKind.VariableDeclaration:
				return this.bindVariableDeclaration(
					syntax as VariableDeclarationSyntax
				);

			case SyntaxKind.ExpressionStatement:
				return this.bindExpressionStatement(
					syntax as ExpressionStatementSyntax
				);

			case SyntaxKind.IfStatement:
				return this.bindIfStatement(syntax as IfStatementSyntax);

			case SyntaxKind.WhileStatement:
				return this.bindWhileStatement(syntax as WhileStatementSyntax);

			default:
				throw new Error(`Unexpected syntax ${syntax.kind}`);
		}
	}

	/**
	 * 块状语句
	 * @param syntax
	 * @returns
	 */
	private bindBlockStatement(
		syntax: BlockStatementSyntax
	): BoundBlockStatement {
		const statements: Array<BoundStatement> = [];

		this._scope = new BoundScope(this._scope);

		for (const statementSyntax of syntax.statements) {
			const statement = this.bindStatement(statementSyntax);
			statements.push(statement);
		}

		this._scope = this._scope.parent!;

		return new BoundBlockStatement(statements);
	}

	private bindVariableDeclaration(
		syntax: VariableDeclarationSyntax
	): BoundStatement {
		const name = syntax.identifier.text!;
		const isReadonly = syntax.keyword.kind === SyntaxKind.LetKeyword;
		const initializer = this.bindExpression(syntax.initializer);
		const variable = new VariableSymbol(name, isReadonly, initializer.type);
		if (!this._scope.tryDeclare(variable)) {
			this.diagnostics.reportVariableAlreadyDeclared(
				syntax.identifier.span,
				name
			);
		}
		return new BoundVariableDeclaration(variable, initializer);
	}

	/**
	 * 表达式语句
	 * @param syntax
	 * @returns
	 */
	private bindExpressionStatement(
		syntax: ExpressionStatementSyntax
	): BoundExpressionStatement {
		const expression = this.bindExpression(syntax.expression);

		return new BoundExpressionStatement(expression);
	}

	private bindIfStatement(syntax: IfStatementSyntax) {
		const conditionExpression = this.bindExpression(
			syntax.condition,
			"boolean"
		);

		const thenStatement = this.bindStatement(syntax.thenStatement);

		const elseStatement =
			syntax.elseClause &&
			this.bindStatement(syntax.elseClause.elseStatement);

		return new BoundIfStatement(
			conditionExpression,
			thenStatement,
			elseStatement
		);
	}

	private bindWhileStatement(
		syntax: WhileStatementSyntax
	): BoundWhileStatement {
		const condition = this.bindExpression(syntax.condition, "boolean");
		const body = this.bindStatement(syntax.body);

		return new BoundWhileStatement(condition, body);
	}

	////////////////////////////////////////////////////////////////
	// EXPRESSION 表达式
	////////////////////////////////////////////////////////////////
	public bindExpression(
		syntax: ExpressionSyntax,
		type?: string
	): BoundExpression {
		const anonymousFn = (syntax: ExpressionSyntax) => {
			switch (syntax.kind) {
				case SyntaxKind.ParenthesizedExpression:
					return this.bindParenthesizedExpression(
						syntax as ParenthesizedExpressionSyntax
					);

				case SyntaxKind.LiteralExpression:
					return this.bindLiteralExpression(
						syntax as LiteralExpressionSyntax
					);

				case SyntaxKind.NamedExpression:
					return this.bindNameExpression(
						syntax as NamedExpressionSyntax
					);

				case SyntaxKind.AssignmentExpression:
					return this.bindAssignmentExpression(
						syntax as AssignmentExpressionSyntax
					);

				case SyntaxKind.UnaryExpression:
					return this.bindUnaryExpression(
						syntax as UnaryExpressionSyntax
					);

				case SyntaxKind.BinaryExpression:
					return this.bindBinaryExpression(
						syntax as BinaryExpressionSyntax
					);

				default:
					throw new Error(`Unexpected syntax ${syntax.kind}`);
			}
		};

		const result = anonymousFn(syntax);

		if (type && type !== result.type) {
			this.diagnostics.reportCannotConvert(
				syntax.span,
				result.type,
				type
			);
		}

		return result;
	}

	/**
	 * 括号
	 * @param syntax
	 * @returns
	 */
	private bindParenthesizedExpression(
		syntax: ParenthesizedExpressionSyntax
	): BoundExpression {
		return this.bindExpression(syntax.expression);
	}

	/**
	 * 文字
	 * @param syntax
	 * @returns
	 */
	private bindLiteralExpression(
		syntax: LiteralExpressionSyntax
	): BoundExpression {
		const value = syntax.value;
		return new BoundLiteralExpression(value);
	}

	/**
	 * 名称
	 * @param syntax
	 */
	private bindNameExpression(syntax: NamedExpressionSyntax): BoundExpression {
		const name = syntax.identifierToken.text as string;

		const variable = this._scope.tryLookup(name);

		if (variable === null) {
			this.diagnostics.reportUndefinedName(
				syntax.identifierToken.span,
				name
			);
			return new BoundLiteralExpression(undefined);
		}

		return new BoundVariableExpression(variable!);
	}

	/**
	 * 赋值
	 * @param syntax
	 */
	private bindAssignmentExpression(
		syntax: AssignmentExpressionSyntax
	): BoundExpression {
		const name = syntax.identifierToken.text as string;

		const boundExpression = this.bindExpression(syntax.expression);

		let variable = this._scope.tryLookup(name);

		if (!variable) {
			this._diagnostics.reportUndefinedName(
				syntax.identifierToken.span,
				name
			);
			return boundExpression;
		}

		if (variable.isReadonly) {
			this._diagnostics.reportCannotAssign(syntax.equalsToken.span, name);
		}

		if (boundExpression.type !== variable.type) {
			this._diagnostics.reportCannotConvert(
				syntax.expression.span,
				boundExpression.type,
				variable.type
			);
			return boundExpression;
		}

		return new BoundAssignmentExpression(variable, boundExpression);
	}

	/**
	 * 一元表达式
	 * @param syntax
	 * @returns
	 */
	private bindUnaryExpression(
		syntax: UnaryExpressionSyntax
	): BoundExpression {
		const boundOperand = this.bindExpression(syntax.operand);

		const boundOperator = BoundUnaryOperator.bind(
			syntax.operatorToken.kind,
			boundOperand.type
		);

		if (boundOperator === null) {
			this._diagnostics.reportUndefinedUnaryOperator(
				syntax.operatorToken.span,
				syntax.operatorToken.text!,
				boundOperand.type
			);
			return boundOperand;
		}

		return new BoundUnaryExpression(boundOperator, boundOperand);
	}

	/**
	 * 基本表达式
	 * @param syntax
	 * @returns
	 */
	private bindBinaryExpression(
		syntax: BinaryExpressionSyntax
	): BoundExpression {
		const boundLeft = this.bindExpression(syntax.left);
		const boundRight = this.bindExpression(syntax.right);
		const boundOperator = BoundBinaryOperator.bind(
			syntax.operatorToken.kind,
			boundLeft.type,
			boundRight.type
		);

		if (boundOperator === null) {
			this._diagnostics.reportUndefinedBinaryOperator(
				syntax.operatorToken.span,
				syntax.operatorToken.text!,
				boundLeft.type,
				boundRight.type
			);
			return boundLeft;
		}

		return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
	}
}
