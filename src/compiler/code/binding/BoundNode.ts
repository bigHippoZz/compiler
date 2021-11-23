import { BoundNodeKind } from "./BoundNodeKind";

export abstract class BoundNode {
	public abstract get kind(): BoundNodeKind;
}
