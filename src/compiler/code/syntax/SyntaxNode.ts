import { TextSpan } from "../text/TextSpan";
import { SyntaxKind } from "./SyntaxKind";

export abstract class SyntaxNode {
	public abstract get kind(): SyntaxKind;

	public abstract getChildren(): SyntaxNode[];

	public get span(): TextSpan {
		const child = this.getChildren();

		const firstSpan = child[0]?.span;

		const lastSpan = child[child.length - 1]?.span;

		return TextSpan.fromBounds(firstSpan.start, lastSpan.end);
	}
}
