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

		const expression = binder.bindExpression(syntax.expression);
		// TODO
		const variables = binder._scope.getDeclareVariables();

		const diagnostics = DiagnosticsBag.fromArray(binder._diagnostics);

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

	public bindExpression(syntax: ExpressionSyntax): BoundExpression {
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
				return this.bindNameExpression(syntax as NamedExpressionSyntax);

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

		const variable = new VariableSymbol(name, boundExpression.type);

		if (!this._scope.tryDeclare(variable)) {
			this.diagnostics.reportVariableAlreadyDeclared(
				syntax.identifierToken.span,
				name
			);
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
