import { SyntaxTree } from "./syntax/SyntaxTree";
import { Binder } from "./binding/Binder";
import { Evaluator } from "./Evaluator";
import { EvaluationResult } from "./EvaluationResult";
import { VariableSymbol } from "./VariableSymbol";
import { BoundGlobalScope } from "./binding/BoundGlobalScope";

export type GlobalVariableDeclaration = Map<VariableSymbol, any>;

export class Compilation {
	private _globalScope: BoundGlobalScope | null = null;

	constructor(
		public syntax: SyntaxTree,
		public previous: Compilation | null = null
	) {}

	public get globalScope(): BoundGlobalScope {
		if (this._globalScope === null) {
			this._globalScope = Binder.bindGlobalScope(
				this.syntax.root,
				this.previous?._globalScope ?? null
			);
		}
		return this._globalScope;
	}

	public continueWith(syntax: SyntaxTree) {
		return new Compilation(syntax, this);
	}

	public evaluate(variables: GlobalVariableDeclaration): EvaluationResult {
		const diagnostics = this.syntax.diagnostics.concat(
			this.globalScope.diagnostics
		);

		if (diagnostics.length) {
			return new EvaluationResult(diagnostics, null);
		}

		const evaluator = new Evaluator(this.globalScope.expression, variables);

		const value = evaluator.evaluate();

		return new EvaluationResult(diagnostics, value);
	}
}
