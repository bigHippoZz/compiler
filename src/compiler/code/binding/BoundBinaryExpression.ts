import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";
import { BoundBinaryOperator } from "./BoundBinaryOperator";

export class BoundBinaryExpression extends BoundExpression {
	constructor(
		public left: BoundExpression,
		public operate: BoundBinaryOperator,
		public right: BoundExpression
	) {
		super();
	}

	public get type(): string {
		return this.operate.type;
	}
	public get kind(): BoundNodeKind {
		return BoundNodeKind.BinaryExpression;
	}
}
