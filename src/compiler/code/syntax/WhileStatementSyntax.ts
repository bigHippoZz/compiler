import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";
import { StatementSyntax } from "./StatementSyntax";

export class WhileStatementSyntax extends StatementSyntax {
	constructor(
		public whileKeyword: SyntaxToken,
		public condition: ExpressionSyntax,
		public body: StatementSyntax
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.WhileStatement;
	}
	public getChildren(): SyntaxNode[] {
		return [this.whileKeyword, this.condition, this.body];
	}
}
