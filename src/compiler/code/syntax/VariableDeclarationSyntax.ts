import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { StatementSyntax } from "./StatementSyntax";

// var a = 100
// let b = 10
export class VariableDeclarationSyntax extends StatementSyntax {
	constructor(
		public keyword: SyntaxToken,
		public identifier: SyntaxToken,
		public equalsToken: SyntaxToken,
		public initializer: ExpressionSyntax
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.VariableDeclaration;
	}

	public getChildren(): SyntaxNode[] {
		return [
			this.keyword,
			this.identifier,
			this.equalsToken,
			this.initializer,
		];
	}
}
