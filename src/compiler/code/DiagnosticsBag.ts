import { Diagnostic } from "./Diagnostic";
import { TextSpan } from "./text/TextSpan";
import { SyntaxKind } from "./syntax/SyntaxKind";

export class DiagnosticsBag {
	private _diagnostics: Array<Diagnostic> = [];

	public get diagnostics(): Array<Diagnostic> {
		return this._diagnostics;
	}

	/**
	 * 合并错误信息
	 * @param diagnostics
	 */
	public addRange(diagnostics: DiagnosticsBag) {
		this.diagnostics.push(...diagnostics.diagnostics);
		return this;
	}

	public report(span: TextSpan, message: string) {
		const diagnostic = new Diagnostic(span, message);

		this._diagnostics.push(diagnostic);
	}

	public reportInvalidNumber(span: TextSpan, text: string, type: string) {
		const message = `The number ${text} isn't valid ${type}.`;
		this.report(span, message);
	}

	public reportBadCharacter(position: number, character: string) {
		const span = new TextSpan(position, 1);
		const message = `Bad character input: '${character}'.`;
		this.report(span, message);
	}

	public reportUnexpectedToken(
		span: TextSpan,
		actualKind: SyntaxKind,
		expectedKind: SyntaxKind
	) {
		const message = `Unexpected token <${actualKind}>, expected <${expectedKind}>.`;

		this.report(span, message);
	}

	public reportUndefinedUnaryOperator(
		span: TextSpan,
		operatorText: string,
		operandType: string
	) {
		const message = `Unary operator '${operatorText}' is not defined for type '${operandType}'.`;
		this.report(span, message);
	}

	public reportUndefinedBinaryOperator(
		span: TextSpan,
		operatorText: string,
		leftType: string,
		rightType: string
	) {
		const message = `Binary operator '${operatorText}' is not defined for types '${leftType}' and '${rightType}'.`;
		this.report(span, message);
	}

	public reportUndefinedName(span: TextSpan, name: string) {
		const message = `Variable '${name}' doesn't exist.`;
		this.report(span, message);
	}

	[Symbol.iterator](): IterableIterator<Diagnostic> {
		return this.values();
	}

	private *values() {
		for (const diagnostic of this.diagnostics) {
			yield diagnostic;
		}
	}

	public static fromArray(bag: DiagnosticsBag): Array<Diagnostic> {
		return bag.diagnostics;
	}
}
