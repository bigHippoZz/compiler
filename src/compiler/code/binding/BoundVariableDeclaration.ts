import { BoundNodeKind } from "./BoundNodeKind";
import { VariableSymbol } from "../VariableSymbol";
import { BoundExpression } from "./BoundExpression";
import { BoundStatement } from "./BoundStatement";

export class BoundVariableDeclaration extends BoundStatement {
	constructor(
		public variable: VariableSymbol,
		public initializer: BoundExpression
	) {
		super();
	}

	public get kind(): BoundNodeKind {
		return BoundNodeKind.VariableDeclaration;
	}
}
