import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";
import { BoundUnaryOperator } from "./BoundUnaryOperator";

export class BoundUnaryExpression extends BoundExpression {
	constructor(
		public operate: BoundUnaryOperator,
		public operand: BoundExpression
	) {
		super();
	}

	public get type(): string {
		return this.operate.type!;
	}
	public get kind(): BoundNodeKind {
		return BoundNodeKind.UnaryExpression;
	}
}
