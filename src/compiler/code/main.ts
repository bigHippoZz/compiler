import { Lexer } from "./Lexer";

export class Parser {
	private _syntaxTokens: SyntaxToken[] = [];
	private diagnostics: Array<string> = [];
	constructor(private _input: string) {
		let lexer: Lexer = new Lexer(this._input);
		let token: SyntaxToken;
		do {
			token = lexer.nextToken();
			if (
				token.kind !== SyntaxKind.BadToken &&
				token.kind !== SyntaxKind.WhiteSpaceToken
			) {
				this._syntaxTokens.push(token);
			}
		} while (token.kind !== SyntaxKind.EndOfFileToken);

		this.diagnostics.push(...lexer.diagnostics);
	}
}

export class SyntaxToken {
	constructor(
		private readonly _kind: SyntaxKind,
		private readonly _position: number,
		private readonly _text: string,
		private readonly _value: any
	) {}

	public get kind(): SyntaxKind {
		return this._kind;
	}

	public get position(): number {
		return this._position;
	}

	public get text(): string {
		return this._text;
	}

	public get value(): any {
		return this._value;
	}
}

export enum SyntaxKind {
	/**
	 * 数字
	 */
	NumberToken,
	/**
	 * 空格
	 */
	WhiteSpaceToken,
	/**
	 *  + 运算符
	 */
	PlusToken,
	/**
	 *  - 运算符
	 */
	MinusToken,
	/**
	 *  * 运算符
	 */
	StarToken,
	/**
	 *  / 运算符
	 */
	SlashToken,
	/**
	 *  ( 运算符
	 */
	OpenParenthesesToken,
	/**
	 *  ) 运算符
	 */
	CloseParenthesesToken,
	/**
	 * 无法识别的token
	 */
	BadToken,
	/**
	 * 句法结束token
	 */
	EndOfFileToken,
	NumberExpression,
	BinaryExpression,
	ParenthesizedExpression,
}
