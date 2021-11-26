import { TextLine } from "./TextLine";
import { TextSpan } from "./TextSpan";

export class SourceText extends Array {
	public lines: Array<TextLine>;

	private _text: string;

	public get length(): number {
		return this._text.length;
	}

	public constructor(text: string) {
		super();
		this._text = text;
		this.lines = SourceText.parseLines(this, text);
	}

	public at(index: number) {
		return this._text[index];
	}

	public getLineIndex(position: number): number {
		let lower = 0;
		let upper = this.lines.length - 1;
		while (lower <= upper) {
			var index = lower + (upper - lower) / 2;
			var start = this.lines[index].start;

			if (position == start) return index;

			if (start > position) {
				upper = index - 1;
			} else {
				lower = index + 1;
			}
		}

		return lower - 1;
	}

	public static parseLines(
		sourceText: SourceText,
		text: string
	): Array<TextLine> {
		const result: Array<TextLine> = [];
		let position = 0;

		let lineStart = 0;

		while (position < text.length) {
			let lineBreakWidth = this.getBreakWidth(text, position);
			if (lineBreakWidth === 0) {
				position++;
			} else {
				this.addLine(
					result,
					sourceText,
					position,
					lineStart,
					lineBreakWidth
				);
				position += lineBreakWidth;
				lineStart = position;
			}
		}

		if (position > lineStart)
			this.addLine(result, sourceText, position, lineStart, 0);

		return result;
	}

	public static addLine(
		result: Array<TextLine>,
		text: SourceText,
		position: number,
		lineStart: number,
		lineBreakWidth: number
	) {
		const lineLength = position - lineStart;
		const lineLengthIncludingLineBreak = lineLength + lineBreakWidth;
		const line = new TextLine(
			text,
			lineStart,
			lineLength,
			lineLengthIncludingLineBreak
		);
		result.push(line);
	}

	private static getBreakWidth(text: string, position: number) {
		let c = text[position];
		let l = position + 1 > text.length ? "\0" : text[position + 1];

		if (c == "\r" && l == "\n") return 2;

		if (c == "\r" || c == "\n") return 1;

		return 0;
	}

	public static from(text: string): SourceText {
		return new SourceText(text);
	}

	toString(): string;
	toString(start: number, length: number): string;
	toString(span: TextSpan): string;
	public toString(start?: any, length?: any): string {
		if (start === undefined) {
			return this._text;
		} else if (typeof start === "number") {
			return this._text.substr(start, length);
		} else if (start instanceof TextSpan) {
			return this.toString(start.start, start.length);
		}
		throw new Error(`not sure about the current type ${typeof start}`);
	}
}
