import { BoundNodeKind } from "./BoundNodeKind";
import { BoundExpression } from "./BoundExpression";
import { BoundStatement } from "./BoundStatement";

export class BoundIfStatement extends BoundStatement {
	constructor(
		public condition: BoundExpression,
		public thenStatement: BoundStatement,
		public elseStatement: Nullable<BoundStatement>
	) {
		super();
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.IfStatement;
	}
}
