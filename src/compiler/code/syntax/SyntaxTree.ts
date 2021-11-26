import { ExpressionSyntax } from "./ExpressionSyntax";
import { Parser } from "./Parser";
import { SyntaxToken } from "./SyntaxToken";
import { Lex } from "./Lexer";
import { SyntaxKind } from "./SyntaxKind";
import { Diagnostic } from "../Diagnostic";
import { SourceText } from "../text/SourceText";

export class SyntaxTree {
	public get text(): SourceText {
		return this._text;
	}

	public get diagnostics(): Array<Diagnostic> {
		return this._diagnostics;
	}

	public get root(): ExpressionSyntax {
		return this._root;
	}

	public get endOfFileToken(): SyntaxToken {
		return this._endOfFileToken;
	}

	constructor(
		private _text: SourceText,
		private _diagnostics: Array<Diagnostic>,
		private _root: ExpressionSyntax,
		private _endOfFileToken: SyntaxToken
	) {}

	static parse(input: string): SyntaxTree;
	static parse(input: SourceText): SyntaxTree;
	static parse(input: string | SourceText): SyntaxTree {
		if (input instanceof SourceText) {
			const parser = new Parser(input);
			return parser.parse();
		} else {
			const sourceText = SourceText.from(input);
			return this.parse(sourceText);
		}
	}

	// public static *parseTokens(input: string): IterableIterator<SyntaxToken> {
	// 	const lexer = new Lex(input);

	// 	while (true) {
	// 		const token = lexer.lex();

	// 		if (token.kind === SyntaxKind.EndOfFileToken) {
	// 			break;
	// 		}
	// 		yield token;
	// 	}
	// }
}
