import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";
import { VariableSymbol } from "../VariableSymbol";

export class BoundVariableExpression extends BoundExpression {
	constructor(private _variable: VariableSymbol) {
		super();
	}

	public get variable(): VariableSymbol {
		return this._variable;
	}

	public get type(): string {
		return this.variable.type;
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.VariableExpression;
	}
}
