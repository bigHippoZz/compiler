import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class AssignmentExpressionSyntax extends ExpressionSyntax {
	constructor(
		public identifierToken: SyntaxToken,
		public equalsToken: SyntaxToken,
		public expression: ExpressionSyntax
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.AssignmentExpression;
	}

	public getChildren(): SyntaxNode[] {
		return [this.identifierToken, this.equalsToken, this.expression];
	}
}
