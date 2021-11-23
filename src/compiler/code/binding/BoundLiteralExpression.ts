import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";

export class BoundLiteralExpression extends BoundExpression {
	constructor(public value: any) {
		super();
	}

	public get type(): string {
		return typeof this.value;
	}
	public get kind(): BoundNodeKind {
		return BoundNodeKind.LiteralExpression;
	}
}
