import { SyntaxKind } from "../syntax/SyntaxKind";
import { BoundUnaryOperatorKind } from "./BoundUnaryOperatorKind";

export class BoundUnaryOperator {
	constructor(
		public syntaxKind: SyntaxKind,
		public kind: BoundUnaryOperatorKind,
		public operandType: string,
		public type?: string
	) {}
	private static _operators: BoundUnaryOperator[] = [
		new BoundUnaryOperator(
			SyntaxKind.BangToken,
			BoundUnaryOperatorKind.LogicalNegation,
			"boolean"
		),
		new BoundUnaryOperator(
			SyntaxKind.PlusToken,
			BoundUnaryOperatorKind.Identity,
			"number"
		),
		new BoundUnaryOperator(
			SyntaxKind.MinusToken,
			BoundUnaryOperatorKind.Negation,
			"number"
		),
	];

	public static bind(syntaxKind: SyntaxKind, operandType: string) {
		for (let i = 0; i < this._operators.length; i++) {
			const operator = this._operators[i];
			if (
				operator.syntaxKind === syntaxKind &&
				operator.operandType === operandType
			) {
				return operator;
			}
		}

		return null;
	}
}
