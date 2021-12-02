import { VariableSymbol } from "../VariableSymbol";

export class BoundScope {
	private _variables: Record<string, VariableSymbol> = Object.create(null);

	constructor(private parent: BoundScope | null) {}

	public tryDeclare(variable: VariableSymbol): boolean {
		if (variable.name in this._variables) {
			return false;
		}
		// 声明变量
		this._variables[variable.name] = variable;
		return true;
	}

	public tryLookup(name: string): VariableSymbol | null {
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
