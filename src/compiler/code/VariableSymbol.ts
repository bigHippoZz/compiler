let uid = 1;

export class VariableSymbol {
	private _uid: number;

	constructor(private _name: string, private _type: string) {
		this._uid = ++uid;
	}

	public get uid(): number {
		return this._uid;
	}

	public get name(): string {
		return this._name;
	}

	public get type(): string {
		return this._type;
	}
}
