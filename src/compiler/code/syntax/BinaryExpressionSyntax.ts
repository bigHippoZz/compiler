import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class BinaryExpressionSyntax extends ExpressionSyntax {
	constructor(
		private _left: ExpressionSyntax,
		private _operatorToken: SyntaxToken,
		private _right: ExpressionSyntax
	) {
		super();
	}

	public get left(): ExpressionSyntax {
		return this._left;
	}

	public get operatorToken(): SyntaxToken {
		return this._operatorToken;
	}

	public get right(): ExpressionSyntax {
		return this._right;
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.BinaryExpression;
	}

	public getChildren(): SyntaxNode[] {
		return [this.left, this.operatorToken, this.right];
	}
}
