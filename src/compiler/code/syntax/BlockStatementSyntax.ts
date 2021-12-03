import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxToken } from "./SyntaxToken";
import { StatementSyntax } from "./StatementSyntax";

export class BlockStatementSyntax extends StatementSyntax {
	constructor(
		public openBraceToken: SyntaxToken,
		public statements: Array<StatementSyntax>,
		public closeBraceToken: SyntaxToken
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.BlockStatement;
	}

	public getChildren(): SyntaxNode[] {
		return [this.openBraceToken, ...this.statements, this.closeBraceToken];
	}
}
