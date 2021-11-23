import { SyntaxKind } from "./SyntaxKind";

export abstract class SyntaxNode {
	constructor(public name: string = new.target.name) {}

	public abstract get kind(): SyntaxKind;
	public abstract getChildren(): SyntaxNode[];
}
