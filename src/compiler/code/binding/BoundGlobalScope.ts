import { VariableSymbol } from "../VariableSymbol";
import { Diagnostic } from "../Diagnostic";
import { BoundStatement } from "./BoundStatement";

export class BoundGlobalScope {
	constructor(
		public previous: BoundGlobalScope | null,
		public readonly diagnostics: Array<Diagnostic>,
		public variables: Array<VariableSymbol>,
		public statement: BoundStatement
	) {}
}
