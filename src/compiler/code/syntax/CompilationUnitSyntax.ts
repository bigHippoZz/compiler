import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";

export class CompilationUnitSyntax extends SyntaxNode {
	constructor(
		private _expression: ExpressionSyntax,
		private _endOfFileToken: SyntaxToken
	) {
		super();
	}

	public get endOfFileToken(): SyntaxToken {
		return this._endOfFileToken;
	}

	public get expression(): ExpressionSyntax {
		return this._expression;
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.CompilationUnit;
	}
	public getChildren(): SyntaxNode[] {
		return [this.expression];
	}
}
