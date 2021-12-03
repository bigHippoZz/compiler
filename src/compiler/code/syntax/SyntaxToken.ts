import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { TextSpan } from "../text/TextSpan";

export class SyntaxToken extends SyntaxNode {
	constructor(
		public kind: SyntaxKind,
		public position: number,
		public text: string | null,
		public value: any
	) {
		super();
	}

	public get span() {
		return new TextSpan(this.position, this.text?.length ?? 1);
	}

	public getChildren(): SyntaxNode[] {
		return [];
	}
}
