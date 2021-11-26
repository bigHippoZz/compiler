import { Diagnostic } from "./Diagnostic";

export class EvaluationResult {
	constructor(
		private readonly _diagnostics: Array<Diagnostic>,
		public value: any = null
	) {}

	public get diagnostics() {
		return this._diagnostics;
	}
}
