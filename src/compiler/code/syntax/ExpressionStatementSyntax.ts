import { SyntaxNode } from "./SyntaxNode";
import { SyntaxKind } from "./SyntaxKind";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { StatementSyntax } from "./StatementSyntax";

export class ExpressionStatementSyntax extends StatementSyntax {
	constructor(public expression: ExpressionSyntax) {
		super();
	}

	public get kind(): SyntaxKind {
		return SyntaxKind.ExpressionStatement;
	}

	public getChildren(): SyntaxNode[] {
		return [this.expression];
	}
}
