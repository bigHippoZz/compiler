import { SyntaxTree } from "./syntax/SyntaxTree";
import { Binder } from "./binding/Binder";
import { Evaluator } from "./Evaluator";
import { EvaluationResult } from "./EvaluationResult";
import { VariableSymbol } from "./VariableSymbol";
import { DiagnosticsBag } from "./DiagnosticsBag";

export type GlobalVariableDeclaration = Map<VariableSymbol, any>;

const defaultGlobalVariableDeclaration: GlobalVariableDeclaration = new Map();
export class Compilation {
	constructor(public syntax: SyntaxTree) {}

	public evaluate(
		variables: GlobalVariableDeclaration = defaultGlobalVariableDeclaration
	): EvaluationResult {
		const binder = new Binder(variables);

		const boundExpression = binder.bindExpression(this.syntax.root);

		const diagnostics = DiagnosticsBag.fromArray(
			this.syntax.diagnostics.addRange(binder.diagnostics)
		);

		if (diagnostics.length) {
			return new EvaluationResult(diagnostics, null);
		}

		const evaluator = new Evaluator(boundExpression, variables);

		const value = evaluator.evaluate();

		return new EvaluationResult(diagnostics, value);
	}
}
