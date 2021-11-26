import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class NamedExpressionSyntax extends ExpressionSyntax {
	public get identifierToken(): SyntaxToken {
		return this._identifierToken;
	}

	constructor(private _identifierToken: SyntaxToken) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.NamedExpression;
	}
	public getChildren(): SyntaxNode[] {
		return [this.identifierToken];
	}
}
