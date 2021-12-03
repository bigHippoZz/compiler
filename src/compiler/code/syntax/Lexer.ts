import { StringTools } from "../../utils";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxFacts } from "./SyntaxFacts";
import { DiagnosticsBag } from "../DiagnosticsBag";
import { TextSpan } from "../text/TextSpan";
import { SourceText } from "../text/SourceText";

export class Lex {
	private _position: number = 0;
	/**
	 * 起止位置
	 */
	private _start: number = 0;
	/**
	 * 语法类型
	 */
	private _kind: SyntaxKind = SyntaxKind.BadToken;
	/**
	 * 当前 value
	 */
	private _value: any = null;

	public diagnostics: DiagnosticsBag = new DiagnosticsBag();

	constructor(private readonly text: SourceText) {}

	private get current(): string {
		return this.peek(0);
	}

	private get lookahead(): string {
		return this.peek(1);
	}

	private peek(offset: number): string {
		const index = this._position + offset;
		if (index >= this.text.length) {
			return "\0";
		}
		return this.text.at(index);
	}

	private next(): void {
		this._position++;
	}

	private readWhitespaceToken() {
		while (StringTools.isWhitespace(this.current)) {
			this.next();
		}
		this._kind = SyntaxKind.WhiteSpaceToken;
	}

	private readNumberToken() {
		while (StringTools.isNumber(this.current)) {
			this.next();
		}

		const length = this._position - this._start;

		const text = this.text.toString(this._start, length);

		this._value = Number(text);

		if (isNaN(this._value)) {
			this.diagnostics.reportInvalidNumber(
				new TextSpan(this._start, this._position - this._start),
				text,
				typeof this._value
			);
		}

		this._kind = SyntaxKind.NumberToken;
	}

	private readIdentifierOrKeyword() {
		while (StringTools.isWord(this.current)) {
			this.next();
		}

		const length = this._position - this._start;

		const text = this.text.toString(this._start, length);

		this._kind = SyntaxFacts.getKeywordKind(text);
	}

	private _validateRE(RE: RegExp) {
		return (this.current.match(RE) || {}).input;
	}

	public lex(): SyntaxToken {
		this._start = this._position;
		this._kind = SyntaxKind.BadToken;
		this._value = null;

		switch (this.current) {
			case "\0":
				this._kind = SyntaxKind.EndOfFileToken;
				break;
			case "+":
				this._kind = SyntaxKind.PlusToken;
				this.next();
				break;
			case "-":
				this._kind = SyntaxKind.MinusToken;
				this.next();
				break;

			case "*":
				this._kind = SyntaxKind.StarToken;
				this.next();
				break;

			case "/":
				this._kind = SyntaxKind.SlashToken;
				this.next();
				break;
			case "(":
				this._kind = SyntaxKind.OpenParenthesesToken;
				this.next();
				break;
			case ")":
				this._kind = SyntaxKind.CloseParenthesesToken;
				this.next();
				break;

			case "{":
				this._kind = SyntaxKind.OpenBraceToken;
				this.next();
				break;
			case "}":
				this._kind = SyntaxKind.CloseBraceToken;
				this.next();
				break;

			case "&":
				if (this.lookahead == "&") {
					this._kind = SyntaxKind.AmpersandAmpersandToken;
					this._position += 2;
					break;
				}
				break;

			case "|":
				if (this.lookahead == "|") {
					this._kind = SyntaxKind.PipePipeToken;
					this._position += 2;
					break;
				}
				break;

			case "=":
				this.next();
				if (this.current !== "=") {
					this._kind = SyntaxKind.EqualsToken;
				} else {
					this.next();
					this._kind = SyntaxKind.EqualsEqualsToken;
				}
				break;

			case "!":
				this.next();
				// @ts-ignore
				if (this.current !== "=") {
					this._kind = SyntaxKind.BangToken;
				} else {
					this._kind = SyntaxKind.BangEqualsToken;
					this.next();
				}
				break;

			case this._validateRE(StringTools.numberRE):
				this.readNumberToken();
				break;

			case " ":
			case "\r":
			case "\n":
			case "\t":
			case this._validateRE(StringTools.whitespaceRE):
				this.readWhitespaceToken();
				break;

			case this._validateRE(StringTools.wordRE):
				this.readIdentifierOrKeyword();
				break;

			default:
				this.diagnostics.reportBadCharacter(
					this._position,
					this.current
				);
				this.next();
				break;
		}

		const length = this._position - this._start;

		let text = SyntaxFacts.getText(this._kind);

		if (text === null) {
			text = this.text.toString(this._start, length);
		}

		return new SyntaxToken(this._kind, this._position, text, this._value);
	}
}
