export class VariableSymbol {
	constructor(private _name: string, private _type: string) {}

	public get type(): string {
		return this._type;
	}

	public get name(): string {
		return this._name;
	}
}
