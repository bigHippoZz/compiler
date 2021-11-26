import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";

export class UnaryExpressionSyntax extends ExpressionSyntax {
	constructor(
		private _operatorToken: SyntaxToken,
		private _operand: ExpressionSyntax
	) {
		super();
	}

	public get operand(): ExpressionSyntax {
		return this._operand;
	}

	public get operatorToken(): SyntaxToken {
		return this._operatorToken;
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.UnaryExpression;
	}

	public getChildren(): SyntaxNode[] {
		return [this.operatorToken, this.operand];
	}
}
