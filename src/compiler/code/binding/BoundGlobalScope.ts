import { BoundExpression } from "./BoundExpression";
import { VariableSymbol } from "../VariableSymbol";
import { Diagnostic } from "../Diagnostic";

export class BoundGlobalScope {
	constructor(
		private _previous: BoundGlobalScope | null,
		private readonly _diagnostics: Array<Diagnostic>,
		private _variables: Array<VariableSymbol>,
		private _expression: BoundExpression
	) {}

	public get previous(): BoundGlobalScope | null {
		return this._previous;
	}

	public get diagnostics(): Array<Diagnostic> {
		return this._diagnostics;
	}

	public get variables(): Array<VariableSymbol> {
		return this._variables;
	}

	public get expression(): BoundExpression {
		return this._expression;
	}
}
