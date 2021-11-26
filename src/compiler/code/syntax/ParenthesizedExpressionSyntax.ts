import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class ParenthesizedExpressionSyntax extends ExpressionSyntax {
	constructor(
		private _openParenthesisToken: SyntaxToken,
		private _expression: ExpressionSyntax,
		private _closeParenthesisToken: SyntaxToken
	) {
		super();
	}

	public get closeParenthesisToken(): SyntaxToken {
		return this._closeParenthesisToken;
	}

	public get expression(): ExpressionSyntax {
		return this._expression;
	}

	public get openParenthesisToken(): SyntaxToken {
		return this._openParenthesisToken;
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
