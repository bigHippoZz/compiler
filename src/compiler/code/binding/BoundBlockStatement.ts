import { BoundNodeKind } from "./BoundNodeKind";
import { BoundStatement } from "./BoundStatement";

export class BoundBlockStatement extends BoundStatement {
	constructor(public statements: Array<BoundStatement>) {
		super();
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.BlockStatement;
	}
}
