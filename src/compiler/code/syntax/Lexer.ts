import { String } from "../../utils";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxFacts } from "./SyntaxFacts";
import { DiagnosticsBag } from "../DiagnosticsBag";
import { TextSpan } from "../TextSpan";

export class Lex {
	private _position: number = 0;

	public diagnostics: DiagnosticsBag = new DiagnosticsBag();

	constructor(private readonly _text: string) {}

	private get current(): string {
		return this.peek(0);
	}

	private peek(offset: number): string {
		const index = this._position + offset;

		if (index >= this._text.length) {
			return "\0";
		}

		return this._text[index];
	}

	private get lookahead(): string {
		return this.peek(1);
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
				this.diagnostics.reportInvalidNumber(
					new TextSpan(start, this._position - start),
					text,
					typeof value
				);
				// this.diagnostics.push(`The number ${text} isn't valid`);
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

		if (String.isWord(this.current)) {
			const start = this._position;
			while (String.isWord(this.current)) {
				this.next();
			}

			const text = this._text.substring(start, this._position);
			const kind = SyntaxFacts.getKeywordKind(text);

			return new SyntaxToken(kind, start, text, null);
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

			case "!":
				if (this.lookahead === "=") {
					return new SyntaxToken(
						SyntaxKind.BangEqualsToken,
						(this._position += 2),
						"!=",
						null
					);
				} else {
					return new SyntaxToken(
						SyntaxKind.BangToken,
						this._position++,
						"!",
						null
					);
				}

			case "&":
				if (this.lookahead === "&") {
					return new SyntaxToken(
						SyntaxKind.AmpersandAmpersandToken,
						(this._position += 2),
						"&&",
						null
					);
				}
				break;
			case "|":
				if (this.lookahead === "|") {
					return new SyntaxToken(
						SyntaxKind.PipePipeToken,
						(this._position += 2),
						"||",
						null
					);
				}
				break;
			case "=":
				if (this.lookahead === "=") {
					return new SyntaxToken(
						SyntaxKind.EqualsEqualsToken,
						(this._position += 2),
						"==",
						null
					);
				} else {
					return new SyntaxToken(
						SyntaxKind.EqualsToken,
						this._position++,
						"=",
						null
					);
				}
				break;
		}

		// this.diagnostics.push(`ERROR: bad character input '${this.current}'`);

		this.diagnostics.reportBadCharacter(this._position, this.current);
		debugger;
		return new SyntaxToken(
			SyntaxKind.BadToken,
			this._position++,
			this._text.substr(this._position - 1, 1),
			null
		);
	}
}
