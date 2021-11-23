import { ExpressionSyntax } from "./ExpressionSyntax";
import { Parser } from "./Parser";
import { SyntaxToken } from "./SyntaxToken";
import { DiagnosticsBag } from "../DiagnosticsBag";

export class SyntaxTree {
	constructor(
		public diagnostics: DiagnosticsBag,
		public root: ExpressionSyntax,
		public endOfFileToken: SyntaxToken
	) {}
	static parse(input: string) {
		const parser = new Parser(input);
		return parser.parse();
	}
}
