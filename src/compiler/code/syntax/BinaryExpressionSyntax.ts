import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class BinaryExpressionSyntax extends ExpressionSyntax {
	public get kind(): SyntaxKind {
		return SyntaxKind.BinaryExpression;
	}

	public getChildren(): SyntaxNode[] {
		return [this.left, this.operatorToken, this.right];
	}
	constructor(
		public left: ExpressionSyntax,
		public operatorToken: SyntaxToken,
		public right: ExpressionSyntax
	) {
		super();
	}
}
