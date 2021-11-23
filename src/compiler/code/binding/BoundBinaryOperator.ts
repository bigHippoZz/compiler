import { BoundBinaryOperatorKind } from "./BoundBinaryOperatorKind";
import { SyntaxKind } from "../syntax/SyntaxKind";

export class BoundBinaryOperator {
	public syntaxKind!: SyntaxKind;
	public kind!: BoundBinaryOperatorKind;
	public leftType!: string;
	public rightType!: string;
	public type!: string;

	constructor(
		syntaxKind: SyntaxKind,
		kind: BoundBinaryOperatorKind,
		leftType: string,
		rightType?: string,
		type?: string
	);
	constructor(
		syntaxKind: SyntaxKind,
		kind: BoundBinaryOperatorKind,
		leftType: string,
		rightType: string,
		type?: string
	);
	constructor(
		syntaxKind: SyntaxKind,
		kind: BoundBinaryOperatorKind,
		leftType: string,
		rightType: string,
		type: string = leftType
	) {
		this.syntaxKind = syntaxKind;
		this.kind = kind;
		this.leftType = leftType;

		if (rightType === void 0) {
			this.rightType = this.leftType;
			this.type = type;
		} else if (type === void 0) {
			this.rightType = this.leftType;
			this.type = rightType;
		} else {
			this.rightType = rightType;
			this.type = type;
		}
	}

	private static _operators: BoundBinaryOperator[] = [
		////////////////////////////////
		// + - * /
		////////////////////////////////
		new BoundBinaryOperator(
			SyntaxKind.PlusToken,
			BoundBinaryOperatorKind.Addition,
			"number"
		),
		new BoundBinaryOperator(
			SyntaxKind.MinusToken,
			BoundBinaryOperatorKind.Subtraction,
			"number"
		),
		new BoundBinaryOperator(
			SyntaxKind.StarToken,
			BoundBinaryOperatorKind.Multiplication,
			"number"
		),
		new BoundBinaryOperator(
			SyntaxKind.SlashToken,
			BoundBinaryOperatorKind.Division,
			"number"
		),

		////////////////////////////////
		// != ==
		////////////////////////////////

		new BoundBinaryOperator(
			SyntaxKind.EqualsEqualsToken,
			BoundBinaryOperatorKind.Equals,
			"number",
			"boolean"
		),

		new BoundBinaryOperator(
			SyntaxKind.BangEqualsToken,
			BoundBinaryOperatorKind.NotEquals,
			"number",
			"boolean"
		),

		new BoundBinaryOperator(
			SyntaxKind.EqualsEqualsToken,
			BoundBinaryOperatorKind.Equals,
			"boolean",
			"boolean"
		),

		new BoundBinaryOperator(
			SyntaxKind.BangEqualsToken,
			BoundBinaryOperatorKind.NotEquals,
			"boolean",
			"boolean"
		),

		////////////////////////////////
		// && ||
		////////////////////////////////

		new BoundBinaryOperator(
			SyntaxKind.AmpersandAmpersandToken,
			BoundBinaryOperatorKind.LogicalAnd,
			"boolean"
		),
		new BoundBinaryOperator(
			SyntaxKind.PipePipeToken,
			BoundBinaryOperatorKind.LogicalOr,
			"boolean"
		),
	];

	public static bind(
		syntaxKind: SyntaxKind,
		leftType: string,
		rightType: string
	) {
		for (let i = 0; i < this._operators.length; i++) {
			const operator = this._operators[i];
			if (
				operator.syntaxKind === syntaxKind &&
				operator.leftType === leftType &&
				operator.rightType === rightType
			) {
				return operator;
			}
		}

		return null;
	}
}
