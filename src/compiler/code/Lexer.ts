import { String } from "../utils";
import { SyntaxToken, SyntaxKind } from "./main";

export class Lexer {
	private _position: number = 0;

	public diagnostics: Array<string> = [];

	constructor(private readonly _text: string) {}

	private get current(): string {
		if (this._position >= this._text.length) {
			return "\0";
		}
		return this._text[this._position];
	}

	private next(): void {
		this._position++;
	}

	public nextToken(): SyntaxToken {
		/**
		 * 遍历字符串到达句尾,返回句尾的token
		 */
		if (this._position >= this._text.length) {
			return new SyntaxToken(
				SyntaxKind.EndOfFileToken,
				this._position,
				"\0",
				null
			);
		}

		if (String.isNumber(this.current)) {
			const start = this._position;

			while (String.isNumber(this.current)) {
				this.next();
			}

			const text = this._text.substring(start, this._position);

			const value = Number(text);

			if (isNaN(value)) {
				this.diagnostics.push(`The number ${text} isn't valid`);
			}

			return new SyntaxToken(SyntaxKind.NumberToken, start, text, value);
		}

		if (String.isWhitespace(this.current)) {
			const start = this._position;

			while (String.isWhitespace(this.current)) {
				this.next();
			}

			const text = this._text.substring(start, this._position);

			return new SyntaxToken(
				SyntaxKind.WhiteSpaceToken,
				start,
				text,
				null
			);
		}

		switch (this.current) {
			case "+":
				return new SyntaxToken(
					SyntaxKind.PlusToken,
					this._position++,
					"+",
					null
				);

			case "-":
				return new SyntaxToken(
					SyntaxKind.MinusToken,
					this._position++,
					"-",
					null
				);
			case "*":
				return new SyntaxToken(
					SyntaxKind.StarToken,
					this._position++,
					"*",
					null
				);
			case "/":
				return new SyntaxToken(
					SyntaxKind.SlashToken,
					this._position++,
					"/",
					null
				);
			case "(":
				return new SyntaxToken(
					SyntaxKind.OpenParenthesesToken,
					this._position++,
					"(",
					null
				);
			case ")":
				return new SyntaxToken(
					SyntaxKind.CloseParenthesesToken,
					this._position++,
					")",
					null
				);
			default:
				this.diagnostics.push(
					`ERROR: bad character input '${this.current}'`
				);
				return new SyntaxToken(
					SyntaxKind.BadToken,
					this._position++,
					this._text.substr(this._position - 1, 1),
					null
				);
		}
	}
}
