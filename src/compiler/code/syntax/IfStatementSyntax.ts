import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind } from "./SyntaxKind";
import { SyntaxNode } from "./SyntaxNode";
import { SyntaxToken } from "./SyntaxToken";
import { StatementSyntax } from "./StatementSyntax";
import { ElseClauseSyntax } from "./ElseClauseSyntax";

/**
 *
 * if(condition){
 *
 * }else {

 * }
 */

export class IfStatementSyntax extends SyntaxNode {
	constructor(
		public ifKeyword: SyntaxToken,
		public condition: ExpressionSyntax,
		public thenStatement: StatementSyntax,
		public elseClause: Nullable<ElseClauseSyntax>
	) {
		super();
	}
	public get kind(): SyntaxKind {
		return SyntaxKind.IfStatement;
	}
	public getChildren(): SyntaxNode[] {
		const child = [this.ifKeyword, this.condition, this.thenStatement];
		if (this.elseClause) {
			child.push(this.elseClause);
		}
		return child;
	}
}
