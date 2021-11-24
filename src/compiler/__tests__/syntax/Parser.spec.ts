import { SyntaxFacts } from "../../code/syntax/SyntaxFacts";
import { SyntaxKind } from "../../code/syntax/SyntaxKind";
describe("Parser", () => {
	it("the priority of the AST should be specified", () => {
		function generateSyntaxKind(): Array<[SyntaxKind, SyntaxKind]> {
			const result: Array<[SyntaxKind, SyntaxKind]> = [];
			for (const binaryKind of SyntaxFacts.getBinaryOperatorKinds()) {
				for (const unaryKind of SyntaxFacts.getUnaryOperatorKinds()) {
					result.push([binaryKind, unaryKind]);
				}
			}
			return result;
		}

		const kinds = generateSyntaxKind();

		for (const [aKind, bKind] of kinds) {
			const operatorAPrecedence =
				SyntaxFacts.getBinaryOperatorPrecedence(aKind);
			const operatorBPrecedence =
				SyntaxFacts.getBinaryOperatorPrecedence(bKind);
			const operatorAText = SyntaxFacts.getText(aKind);
			const operatorBText = SyntaxFacts.getText(bKind);

			const text = `a ${operatorAText} b ${operatorBText} c`;

			if (operatorAPrecedence >= operatorBPrecedence) {
				expect(true).toBeFalsy();
			} else {
				expect(false).toBeTruthy();
			}
		}
	});
});
