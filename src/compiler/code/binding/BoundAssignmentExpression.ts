import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";

export class BoundAssignmentExpression extends BoundExpression {
	constructor(private _name: string, private _expression: BoundExpression) {
		super();
	}

	public get expression(): BoundExpression {
		return this._expression;
	}

	public get name(): string {
		return this._name;
	}

	public get type(): string {
		return this.expression.type;
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.AssignmentExpression;
	}
}
