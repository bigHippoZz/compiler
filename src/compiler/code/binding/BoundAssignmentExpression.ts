import { VariableSymbol } from "./../VariableSymbol";
import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";

export class BoundAssignmentExpression extends BoundExpression {
	constructor(
		public variable: VariableSymbol,
		public expression: BoundExpression
	) {
		super();
	}

	public get type(): string {
		return this.expression.type;
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.AssignmentExpression;
	}
}
