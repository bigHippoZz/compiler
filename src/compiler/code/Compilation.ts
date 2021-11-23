import { SyntaxTree } from "./syntax/SyntaxTree";
import { Binder } from "./binding/Binder";
import { Evaluator } from "./Evaluator";
import { EvaluationResult } from "./EvaluationResult";

export type GlobalVariableDeclaration = Record<string, any>;

const defaultGlobalVariableDeclaration: GlobalVariableDeclaration =
	Object.create(null);

export class Compilation {
	constructor(public syntax: SyntaxTree) {}

	public evaluate(
		variables: GlobalVariableDeclaration = defaultGlobalVariableDeclaration
	): EvaluationResult {
		const binder = new Binder(variables);

		const boundExpression = binder.bindExpression(this.syntax.root);

		const diagnostics = this.syntax.diagnostics.diagnostics;

		if (diagnostics.length) {
			return new EvaluationResult(diagnostics, null);
		}

		const evaluator = new Evaluator(boundExpression, variables);

		const value = evaluator.evaluate();

		return new EvaluationResult(diagnostics, value);
	}
}
