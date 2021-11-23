import { BoundNode } from "./BoundNode";

export abstract class BoundExpression extends BoundNode {
	public abstract get type(): string;
}
