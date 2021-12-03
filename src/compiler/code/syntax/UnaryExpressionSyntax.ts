import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class UnaryExpressionSyntax extends ExpressionSyntax {
	constructor(
		public operatorToken: SyntaxToken,
		public operand: ExpressionSyntax
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.UnaryExpression;
	}

	public getChildren(): SyntaxNode[] {
		return [this.operatorToken, this.operand];
	}
}
