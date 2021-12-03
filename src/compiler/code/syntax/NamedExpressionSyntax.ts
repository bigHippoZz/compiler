import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class NamedExpressionSyntax extends ExpressionSyntax {
	constructor(public identifierToken: SyntaxToken) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.NamedExpression;
	}
	public getChildren(): SyntaxNode[] {
		return [this.identifierToken];
	}
}
