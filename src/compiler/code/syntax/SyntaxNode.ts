import { SyntaxKind } from "./SyntaxKind";

export abstract class SyntaxNode {
	constructor(public name: string = new.target.name) {}

	public abstract get kind(): SyntaxKind;

	// public getChildren(): SyntaxNode[] {
	// 	const properties = Object.getOwnPropertyNames(this);
	// 	const syntaxNode: SyntaxNode[] = [];
	// 	for (const prop of properties) {
	// 		if (prop === "name") continue;
	// 		// @ts-ignore
	// 		syntaxNode.push(this[prop]);
	// 	}
	// 	return syntaxNode;
	// }
	public abstract getChildren(): SyntaxNode[];
}
