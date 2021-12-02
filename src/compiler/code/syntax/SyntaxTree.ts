import { Parser } from "./Parser";
import { Diagnostic } from "../Diagnostic";
import { SourceText } from "../text/SourceText";
import { CompilationUnitSyntax } from "./CompilationUnitSyntax";
import { DiagnosticsBag } from "../DiagnosticsBag";

export class SyntaxTree {
	private _root: CompilationUnitSyntax;

	private _diagnostics: Diagnostic[];

	public get root(): CompilationUnitSyntax {
		return this._root;
	}

	public get text(): SourceText {
		return this._text;
	}

	public get diagnostics(): Array<Diagnostic> {
		return this._diagnostics;
	}

	constructor(private _text: SourceText) {
		const parser = new Parser(this._text);
		const root = parser.parseCompilationUnit();
		const diagnostics = parser.diagnostics;

		this._root = root;

		this._diagnostics = DiagnosticsBag.fromArray(diagnostics);
	}

	static parse(input: string): SyntaxTree;
	static parse(input: SourceText): SyntaxTree;
	static parse(input: string | SourceText): SyntaxTree {
		if (input instanceof SourceText) {
			return new SyntaxTree(input);
		} else {
			const sourceText = SourceText.from(input);
			return this.parse(sourceText);
		}
	}
}
