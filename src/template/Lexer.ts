import { isASCIIAlpha, isEndOfTagSection, isWhitespace } from "./CharCodes";
import { SyntaxStatus } from "./SyntaxStatus";
import { CharCodes } from "./CharCodes";

export class Lex {
	private _index: number = 0;
	private _sectionStart: number = 0;
	private _length: number = 0;
	private _state: SyntaxStatus = SyntaxStatus.Text;
	private _buffer: string;
	constructor(data: string) {
		this._buffer = data;
	}

	private nextToken() {
		this._index++;
	}

	private shouldContinue(): boolean {
		return this._index > this._buffer.length;
	}

	private fastForwardTo(code: number): boolean {
		while (++this._index < this._buffer.length) {
			if (code === this._buffer.charCodeAt(this._index)) {
				return true;
			}
		}
		this._index = this._buffer.length - 1;
		return false;
	}

	private lex() {
		while (this.shouldContinue()) {
			const code = this._buffer.charCodeAt(this._index);
			switch (this._state) {
				case SyntaxStatus.Text:
					this.processStatusText(code);
					break;
				case SyntaxStatus.BeforeTagName:
					this.processStatusBeforeTagName(code);
					break;
				case SyntaxStatus.InTagName:
					this.processStatusInTagName(code);
					break;
				case SyntaxStatus.InSelfClosingTag:
					this.processStatusInSelfClosingTag(code);
					break;
				case SyntaxStatus.BeforeClosingTagName:
					this.processStatusBeforeClosingTagName(code);
					break;
				case SyntaxStatus.InClosingTag:
					this.processStatusInClosingTag(code);
					break;
				case SyntaxStatus.AfterClosingTagName:
					this.processStatusAfterClosingTagName(code);
					break;

				case SyntaxStatus.BeforeAttributeName:
					this.processStatusBeforeAttributeName(code);
					break;
				case SyntaxStatus.InAttributeName:
					this.processStatusInAttributeName(code);
					break;
				case SyntaxStatus.AfterAttributeName:
					this.processStatusAfterAttributeName(code);
					break;
				case SyntaxStatus.BeforeAttributeValue:
					this.processStatusBeforeAttributeValue(code);
					break;
				case SyntaxStatus.InAttributeValueSq:
					this.processStatusInAttributeValueSq(code);
					break;
				case SyntaxStatus.InAttributeValueDq:
					this.processStatusInAttributeValueDq(code);
					break;

				default:
					throw new Error(`${this._buffer[this._index]}`);
			}
			this.nextToken();
		}
	}

	private processStatusInAttributeValueDq(code: number) {
		this.processStatusInAttributeValue(code, CharCodes.DoubleQuote);
	}

	private processStatusInAttributeValueSq(code: number) {
		this.processStatusInAttributeValue(code, CharCodes.SingleQuote);
	}

	private processStatusInAttributeValue(code: number, quote: number) {
		if (code === quote) {
			this._sectionStart = -1;
			this._state = SyntaxStatus.BeforeAttributeName;
		}
	}

	private processStatusBeforeAttributeValue(code: number) {
		if (code === CharCodes.DoubleQuote) {
			this._state = SyntaxStatus.InAttributeValueDq;
			this._sectionStart = this._index + 1;
		} else if (code === CharCodes.SingleQuote) {
			this._state = SyntaxStatus.InAttributeValueSq;
			this._sectionStart = this._index + 1;
		}
	}

	private processStatusAfterClosingTagName(code: number) {
		if (code === CharCodes.GreaterToken) {
			this._state = SyntaxStatus.Text;
			this._sectionStart = this._index + 1;
		}
	}

	private processStatusInClosingTag(code: number) {
		if (code === CharCodes.GreaterToken || isWhitespace(code)) {
			this._sectionStart = -1;
			this._state = SyntaxStatus.AfterClosingTagName;
			this.processStatusAfterClosingTagName(code);
		}
	}

	private processStatusBeforeClosingTagName(code: number) {
		if (isWhitespace(code)) {
			// ignore
		} else if (code === CharCodes.GreaterToken) {
			this._state = SyntaxStatus.Text;
		} else {
			this._state = SyntaxStatus.InClosingTag;
			this._sectionStart = this._index;
		}
	}

	private processStatusInSelfClosingTag(code: number) {
		if (code === CharCodes.GreaterToken) {
			this._state = SyntaxStatus.Text;
			this._sectionStart = this._index + 1;
		} else if (!isWhitespace(code)) {
			this._state = SyntaxStatus.BeforeAttributeName;
			this.processStatusBeforeAttributeName(code);
		}
	}

	private processStatusText(code: number) {
		if (code === CharCodes.LowerToken) {
			this._state = SyntaxStatus.BeforeTagName;
			this._sectionStart = this._index;
		}
	}
	private processStatusBeforeTagName(code: number) {
		// <div
		if (isASCIIAlpha(code)) {
			this._sectionStart = this._index;
			this._state = SyntaxStatus.InTagName;
			// </div
		} else if (code === CharCodes.Slash) {
			this._state = SyntaxStatus.BeforeClosingTagName;
		} else {
			this._state = SyntaxStatus.Text;
			this.processStatusText(code);
		}
	}

	private processStatusInTagName(code: number) {
		/**
		 * div>
		 * div/>
		 *
		 * > / \n \r \t \f ' '
		 */
		if (isEndOfTagSection(code)) {
			this._sectionStart = -1;
			this._state = SyntaxStatus.BeforeAttributeName;
			this.processStatusBeforeAttributeName(code);
		}
	}

	private processStatusBeforeAttributeName(code: number) {
		if (code === CharCodes.GreaterToken) {
			this._state = SyntaxStatus.Text;
			this._sectionStart = this._index + 1;
		} else if (code === CharCodes.Slash) {
			this._state = SyntaxStatus.InSelfClosingTag;
		} else if (!isWhitespace(code)) {
			this._state = SyntaxStatus.InAttributeName;
			this._sectionStart = this._index;
		}
	}

	private processStatusInAttributeName(code: number) {
		if (code === CharCodes.EqualsToken || isEndOfTagSection(code)) {
			this._sectionStart = -1;
			this._state = SyntaxStatus.AfterAttributeName;
			this.processStatusAfterAttributeName(code);
		}
	}

	private processStatusAfterAttributeName(code: number) {
		if (code === CharCodes.EqualsToken) {
			this._state = SyntaxStatus.BeforeAttributeValue;
		} else if (
			code === CharCodes.GreaterToken ||
			code === CharCodes.Slash
		) {
			this._state = SyntaxStatus.BeforeAttributeName;
			this.processStatusBeforeAttributeName(code);
		} else if (!isWhitespace(code)) {
			this._state = SyntaxStatus.InAttributeName;
			this._sectionStart = this._index;
		}
	}
}
