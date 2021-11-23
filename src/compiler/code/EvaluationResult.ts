import { Diagnostic } from "./Diagnostic";

export class EvaluationResult {
	constructor(private _diagnostics: Diagnostic[], public value: any = null) {}

	public get diagnostics() {
		return this._diagnostics;
	}
}
