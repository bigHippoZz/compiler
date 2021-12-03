import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class ParenthesizedExpressionSyntax extends ExpressionSyntax {
	constructor(
		public openParenthesisToken: SyntaxToken,
		public expression: ExpressionSyntax,
		public closeParenthesisToken: SyntaxToken
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.ParenthesizedExpression;
	}

	public getChildren(): SyntaxNode[] {
		return [
			this.openParenthesisToken,
			this.expression,
			this.closeParenthesisToken,
		];
	}
}
