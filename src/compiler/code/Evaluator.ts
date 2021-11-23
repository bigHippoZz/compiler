import { BoundBinaryExpression } from "./binding/BoundBinaryExpression";
import { BoundBinaryOperatorKind } from "./binding/BoundBinaryOperatorKind";
import { BoundUnaryExpression } from "./binding/BoundUnaryExpression";
import { BoundUnaryOperatorKind } from "./binding/BoundUnaryOperatorKind";
import { BoundLiteralExpression } from "./binding/BoundLiteralExpression";
import { BoundExpression } from "./binding/BoundExpression";
import { GlobalVariableDeclaration } from "./Compilation";
import { BoundVariableExpression } from "./binding/BoundVariableExpression";
import { BoundAssignmentExpression } from "./binding/BoundAssignmentExpression";

export class Evaluator {
	constructor(
		private _root: BoundExpression,
		private _variables: GlobalVariableDeclaration
	) {}

	public get variables(): GlobalVariableDeclaration {
		return this._variables;
	}

	public evaluate() {
		return this._evaluateExpression(this._root);
	}

	private _evaluateExpression(node: BoundExpression): any {
		/**
		 * 处理基本字符
		 */
		if (node instanceof BoundLiteralExpression) {
			// TODO tranv  => number
			return node.value;
		}

		/**
		 * 处理变量
		 */
		if (node instanceof BoundVariableExpression) {
			return this.variables.get(node.variable);
		}

		if (node instanceof BoundAssignmentExpression) {
			const value = this._evaluateExpression(node.expression);
			this._variables.set(node.variable, value);
			return value;
		}

		/**
		 * 处理一元运算符
		 */
		if (node instanceof BoundUnaryExpression) {
			const operand = this._evaluateExpression(node.operand);
			switch (node.operate.kind) {
				case BoundUnaryOperatorKind.Identity:
					return Number(operand);
				case BoundUnaryOperatorKind.Negation:
					return -Number(operand);
				case BoundUnaryOperatorKind.LogicalNegation:
					return !operand;
				default:
					throw new Error(
						`Unexpected unary operator ${node.operate}`
					);
			}
		}

		/**
		 * 处理运算符
		 */
		if (node instanceof BoundBinaryExpression) {
			const left = this._evaluateExpression(node.left);
			const right = this._evaluateExpression(node.right);

			switch (node.operate.kind) {
				case BoundBinaryOperatorKind.Addition:
					return left + right;
				case BoundBinaryOperatorKind.Subtraction:
					return left - right;
				case BoundBinaryOperatorKind.Multiplication:
					return left * right;
				case BoundBinaryOperatorKind.Division:
					return left / right;
				case BoundBinaryOperatorKind.LogicalAnd:
					return left && right;
				case BoundBinaryOperatorKind.LogicalOr:
					return left || right;
				case BoundBinaryOperatorKind.Equals:
					return left === right;
				case BoundBinaryOperatorKind.NotEquals:
					return left !== right;
				default:
					`Unexpected binary operator ${node.operate}`;
			}
		}
		/**
		 * 处理括号
		 */
		// if (node instanceof ParenthesizedExpressionSyntax) {
		// 	return this._evaluateExpression(node.expression);
		// }
		throw new Error(`Unexpected node ${node.kind}`);
	}
}
