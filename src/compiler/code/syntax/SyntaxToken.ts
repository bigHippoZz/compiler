import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { TextSpan } from "../TextSpan";

export class SyntaxToken extends SyntaxNode {
	private _span: TextSpan;

	constructor(
		public kind: SyntaxKind,
		public position: number,
		public text: string | null,
		public value: any
	) {
		super();
		this._span = new TextSpan(this.position, this.text?.length ?? 1);
	}

	public get span() {
		return this._span;
	}

	public getChildren(): SyntaxNode[] {
		return [];
	}
}
