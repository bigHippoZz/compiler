import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";

export class BoundVariableExpression extends BoundExpression {
	public get name(): string {
		return this._name;
	}

	constructor(private _name: string, private _type: string) {
		super();
	}

	public get type(): string {
		return this._type;
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.VariableExpression;
	}
}
