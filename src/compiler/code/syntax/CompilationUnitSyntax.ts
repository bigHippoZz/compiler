import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { StatementSyntax } from "./StatementSyntax";

export class CompilationUnitSyntax extends SyntaxNode {
	constructor(
		public statement: StatementSyntax,
		public endOfFileToken: SyntaxToken
	) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.CompilationUnit;
	}
	public getChildren(): SyntaxNode[] {
		return [this.statement];
	}
}
