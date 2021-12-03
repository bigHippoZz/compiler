import { BoundNode } from "./BoundNode";
import { BoundNodeKind } from "./BoundNodeKind";
import { VariableSymbol } from "../VariableSymbol";
import { BoundExpression } from "./BoundExpression";

export abstract class BoundStatement extends BoundNode {}

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
