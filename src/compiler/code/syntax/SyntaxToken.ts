import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { TextSpan } from "../text/TextSpan";

export class SyntaxToken extends SyntaxNode {
	constructor(
		private _kind: SyntaxKind,
		private _position: number,
		private _text: string | null,
		public value: any
	) {
		super();
	}

	public get text(): string | null {
		return this._text;
	}

	public get position(): number {
		return this._position;
	}

	public get kind(): SyntaxKind {
		return this._kind;
	}

	public get span() {
		return new TextSpan(this.position, this.text?.length ?? 1);
	}

	public getChildren(): SyntaxNode[] {
		return [];
	}
}
