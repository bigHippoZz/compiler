import { BoundNodeKind } from "./BoundNodeKind";
import { BoundExpression } from "./BoundExpression";
import { VariableSymbol } from "../VariableSymbol";
import { BoundStatement } from "./BoundStatement";

export class BoundForStatement extends BoundStatement {
	constructor(
		public variable: VariableSymbol,
		public lowerBound: BoundExpression,
		public upperBound: BoundExpression,
		public body: BoundStatement
	) {
		super();
	}
	public get kind(): BoundNodeKind {
		return BoundNodeKind.ForStatement;
	}
}
