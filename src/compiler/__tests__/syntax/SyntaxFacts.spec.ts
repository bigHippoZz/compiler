import { SyntaxKind } from "../../code/syntax/SyntaxKind";
import { SyntaxFacts } from "../../code/syntax/SyntaxFacts";
import { SyntaxTree } from "../../code/syntax/SyntaxTree";
describe("Syntax Facts", () => {
	it("should return the specified kind type", () => {
		const kinds = Object.values(SyntaxKind);

		for (const kind of kinds) {
			const input = SyntaxFacts.getText(kind);
			if (input === null) continue;
			const actual = SyntaxTree.parseTokens(input).next().value;

			expect(kind).toBe(actual.kind);
			expect(input).toBe(actual.text);
		}
	});
});
