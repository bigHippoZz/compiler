import { BoundNodeKind } from "./BoundNodeKind";
import { BoundStatement } from "./BoundStatement";
import { BoundExpression } from "./BoundExpression";

export class BoundExpressionStatement extends BoundStatement {
	constructor(public expression: BoundExpression) {
		super();
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.ExpressionStatement;
	}
}
