import { ExpressionSyntax } from "./ExpressionSyntax";
import { Parser } from "./Parser";
import { SyntaxToken } from "./SyntaxToken";
import { DiagnosticsBag } from "../DiagnosticsBag";
import { Lex } from "./Lexer";
import { SyntaxKind } from "./SyntaxKind";

export class SyntaxTree {
	constructor(
		public diagnostics: DiagnosticsBag,
		public root: ExpressionSyntax,
		public endOfFileToken: SyntaxToken
	) {}

	public static parse(input: string) {
		const parser = new Parser(input);
		return parser.parse();
	}

	public static *parseTokens(input: string): IterableIterator<SyntaxToken> {
		const lexer = new Lex(input);

		while (true) {
			const token = lexer.lex();

			if (token.kind === SyntaxKind.EndOfFileToken) {
				break;
			}
			yield token;
		}
	}
}
