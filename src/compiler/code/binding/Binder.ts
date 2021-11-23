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
import { GlobalVariableDeclaration } from "../Compilation";
import { Object } from "../../utils";
import { BoundVariableExpression } from "./BoundVariableExpression";
import { BoundAssignmentExpression } from "./BoundAssignmentExpression";

export class Binder {
	public get variables(): GlobalVariableDeclaration {
		return this._variables;
	}

	constructor(private readonly _variables: GlobalVariableDeclaration) {}

	private readonly _diagnostics: DiagnosticsBag = new DiagnosticsBag();

	public get diagnostics(): DiagnosticsBag {
		return this._diagnostics;
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
		let value;
		if (!Reflect.has(this.variables, name)) {
			this.diagnostics.reportUndefinedName(
				syntax.identifierToken.span,
				name
			);
			// TODO null  " "
			return new BoundLiteralExpression(undefined);
		}

		value = Reflect.get(this.variables, name);

		return new BoundVariableExpression(
			name,
			Object.getPrimitiveObjectType(value)
		);
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
		return new BoundAssignmentExpression(name, boundExpression);
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
			syntax.operationToken.kind,
			boundOperand.type
		);

		console.log(boundOperand);
		if (boundOperator === null) {
			this._diagnostics.reportUndefinedUnaryOperator(
				syntax.operationToken.span,
				syntax.operationToken.text!,
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
