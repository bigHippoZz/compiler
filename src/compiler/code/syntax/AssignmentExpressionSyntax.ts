import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class AssignmentExpressionSyntax extends ExpressionSyntax {
	constructor(
		private _identifierToken: SyntaxToken,
		private _equalsToken: SyntaxToken,
		private _expression: ExpressionSyntax
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.AssignmentExpression;
	}

	public get expression(): ExpressionSyntax {
		return this._expression;
	}

	public get equalsToken(): SyntaxToken {
		return this._equalsToken;
	}

	public get identifierToken(): SyntaxToken {
		return this._identifierToken;
	}

	public getChildren(): SyntaxNode[] {
		return [this.identifierToken, this.equalsToken, this.expression];
	}
}
