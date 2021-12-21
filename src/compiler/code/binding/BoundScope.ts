import { VariableSymbol } from "../VariableSymbol";

export class BoundScope {
	private _variables: Record<string, VariableSymbol> = Object.create(null);

	constructor(public parent: Nullable<BoundScope>) {}

	public tryDeclare(variable: VariableSymbol): boolean {
		if (variable.name in this._variables) {
			return false;
		}
		// 声明变量
		this._variables[variable.name] = variable;
		return true;
	}

	public tryLookup(name: string): Nullable<VariableSymbol> {
		if (name in this._variables) {
			return this._variables[name];
		}

		if (this.parent === null) {
			return null;
		}

		return this.parent.tryLookup(name);
	}

	public getDeclareVariables(): Array<VariableSymbol> {
		return Object.values(this._variables);
	}
}
