import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";
import { StatementSyntax } from "./StatementSyntax";

export class ElseClauseSyntax extends SyntaxNode {
	constructor(
		public elseKeyword: SyntaxToken,
		public elseStatement: StatementSyntax
	) {
		super();
	}
	public get kind(): SyntaxKind {
		return SyntaxKind.ElseClause;
	}
	public getChildren(): SyntaxNode[] {
		return [this.elseKeyword, this.elseStatement];
	}
}
