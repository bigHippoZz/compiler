import { VariableSymbol } from "./../VariableSymbol";
import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";

export class BoundAssignmentExpression extends BoundExpression {
	constructor(
		private _variable: VariableSymbol,
		private _expression: BoundExpression
	) {
		super();
	}

	public get expression(): BoundExpression {
		return this._expression;
	}

	public get variable(): VariableSymbol {
		return this._variable;
	}

	public get type(): string {
		return this.expression.type;
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.AssignmentExpression;
	}
}
