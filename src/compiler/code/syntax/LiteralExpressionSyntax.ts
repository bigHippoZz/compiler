import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class LiteralExpressionSyntax extends ExpressionSyntax {
	constructor(
		public LiteralToken: SyntaxToken,
		public value: any = LiteralToken.value
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.LiteralExpression;
	}

	public getChildren(): SyntaxNode[] {
		return [this.LiteralToken];
	}
}
