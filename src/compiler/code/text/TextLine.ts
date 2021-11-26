import { TextSpan } from "./TextSpan";
import { SourceText } from "./SourceText";

export class TextLine {
	constructor(
		private _text: SourceText,
		private _start: number,
		private _length: number,
		private _lengthIncludingLineBreak: number
	) {}

	public get text(): SourceText {
		return this._text;
	}

	public get start(): number {
		return this._start;
	}

	public get end(): number {
		return this.start + this.length;
	}

	public get length(): number {
		return this._length;
	}

	public get lengthIncludingLineBreak(): number {
		return this._lengthIncludingLineBreak;
	}

	public get spanIncludingLineBreak(): TextSpan {
		return new TextSpan(this.start, this.lengthIncludingLineBreak);
	}

	public get span(): TextSpan {
		return new TextSpan(this.start, this.length);
	}

	public toString(): string {
		return this.text.toString(this.span);
	}
}
