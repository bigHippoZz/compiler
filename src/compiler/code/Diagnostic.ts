import { TextSpan } from "./text/TextSpan";

export class Diagnostic {
	public get message(): string {
		return this._message;
	}

	public get textSpan(): TextSpan {
		return this._textSpan;
	}

	constructor(
		private readonly _textSpan: TextSpan,
		private readonly _message: string
	) {}

	public toString(): string {
		return this._message;
	}
}
