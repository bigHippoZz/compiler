export class TextSpan {
	private _end: number;

	constructor(private _start: number, private _length: number) {
		this._end = this._start + this._length;
	}

	public get start(): number {
		return this._start;
	}

	public get length(): number {
		return this._length;
	}

	public get end(): number {
		return this._end;
	}
}
