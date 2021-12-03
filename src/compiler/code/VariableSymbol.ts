let uid = 1;

export class VariableSymbol {
	private _uid: number;

	constructor(
		public name: string,
		public isReadonly: boolean,
		public type: string
	) {
		this._uid = ++uid;
	}

	public get uid(): number {
		return this._uid;
	}
}
