import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";
import { StatementSyntax } from "./StatementSyntax";

export class ForStatementSyntax extends StatementSyntax {
	constructor(
		public forKeyword: SyntaxToken,
		public identifier: SyntaxToken,
		public equalsToken: SyntaxToken,
		public lowerBound: ExpressionSyntax,
		public upperBound: ExpressionSyntax,
		public body: StatementSyntax
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.ForStatement;
	}

	public getChildren(): SyntaxNode[] {
		return [
			this.identifier,
			this.equalsToken,
			this.lowerBound,
			this.upperBound,
		];
	}
}
