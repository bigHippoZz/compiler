import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";
import { BoundStatement } from "./BoundStatement";

export class BoundWhileStatement extends BoundStatement {
	constructor(
		public condition: BoundExpression,
		public body: BoundStatement
	) {
		super();
	}
	public get kind(): BoundNodeKind {
		return BoundNodeKind.WhileStatement;
	}
}
