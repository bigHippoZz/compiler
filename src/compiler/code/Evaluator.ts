import { BoundBinaryExpression } from "./binding/BoundBinaryExpression";
import { BoundBinaryOperatorKind } from "./binding/BoundBinaryOperatorKind";
import { BoundUnaryExpression } from "./binding/BoundUnaryExpression";
import { BoundUnaryOperatorKind } from "./binding/BoundUnaryOperatorKind";
import { BoundLiteralExpression } from "./binding/BoundLiteralExpression";
import { BoundExpression } from "./binding/BoundExpression";
import { GlobalVariableDeclaration } from "./Compilation";
import { BoundVariableExpression } from "./binding/BoundVariableExpression";
import { BoundAssignmentExpression } from "./binding/BoundAssignmentExpression";
import { BoundNodeKind } from "./binding/BoundNodeKind";
import {
	BoundStatement,
	BoundVariableDeclaration,
} from "./binding/BoundStatement";
import { BoundBlockStatement } from "./binding/BoundBlockStatement";
import { BoundExpressionStatement } from "./binding/BoundExpressionStatement";

export class Evaluator {
	private _lastValue: any;

	constructor(
		private _root: BoundStatement,
		private _variables: GlobalVariableDeclaration
	) {}

	public get variables(): GlobalVariableDeclaration {
		return this._variables;
	}

	public evaluate() {
		this._evaluateStatement(this._root);

		return this._lastValue;
	}

	private _evaluateStatement(node: BoundStatement): void {
		switch (node.kind) {
			case BoundNodeKind.BlockStatement:
				this.evaluateBlockStatement(node as BoundBlockStatement);
				break;

			case BoundNodeKind.VariableDeclaration:
				this.evaluateVariableDeclaration(
					node as BoundVariableDeclaration
				);
				break;

			case BoundNodeKind.ExpressionStatement:
				this.evaluateExpressionStatement(
					node as BoundExpressionStatement
				);
				break;
			default:
				throw new Error(`Unexpected node ${node.kind}`);
		}
	}

	public evaluateVariableDeclaration(node: BoundVariableDeclaration) {
		const value = this._evaluateExpression(node.initializer);
		this._variables.set(node.variable, value);
		this._lastValue = value;
	}

	private evaluateBlockStatement(node: BoundBlockStatement): void {
		for (const statement of node.statements) {
			this._evaluateStatement(statement);
		}
	}

	private evaluateExpressionStatement(node: BoundExpressionStatement): void {
		this._lastValue = this._evaluateExpression(node.expression);
	}

	private _evaluateExpression(node: BoundExpression): any {
		switch (node.kind) {
			case BoundNodeKind.LiteralExpression:
				return this.evaluateLiteralExpression(
					node as BoundLiteralExpression
				);
			case BoundNodeKind.VariableExpression:
				return this.evaluateVariableExpression(
					node as BoundVariableExpression
				);
			case BoundNodeKind.AssignmentExpression:
				return this.evaluateAssignmentExpression(
					node as BoundAssignmentExpression
				);
			case BoundNodeKind.UnaryExpression:
				return this.evaluateUnaryExpression(
					node as BoundUnaryExpression
				);
			case BoundNodeKind.BinaryExpression:
				return this.evaluateBinaryExpression(
					node as BoundBinaryExpression
				);
			default:
				throw new Error(`Unexpected node ${node.kind}`);
		}
	}

	private evaluateLiteralExpression(node: BoundLiteralExpression): any {
		return node.value;
	}
	private evaluateVariableExpression(node: BoundVariableExpression): any {
		return this.variables.get(node.variable);
	}

	private evaluateAssignmentExpression(node: BoundAssignmentExpression) {
		const value = this._evaluateExpression(node.expression);
		this._variables.set(node.variable, value);
		return value;
	}
	private evaluateUnaryExpression(node: BoundUnaryExpression) {
		const operand = this._evaluateExpression(node.operand);
		switch (node.operate.kind) {
			case BoundUnaryOperatorKind.Identity:
				return Number(operand);
			case BoundUnaryOperatorKind.Negation:
				return -Number(operand);
			case BoundUnaryOperatorKind.LogicalNegation:
				return !operand;
			default:
				throw new Error(`Unexpected unary operator ${node.operate}`);
		}
	}

	private evaluateBinaryExpression(node: BoundBinaryExpression) {
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
}
