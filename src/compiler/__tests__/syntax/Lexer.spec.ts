import { SyntaxKind } from "../../code/syntax/SyntaxKind";
import { SyntaxTree } from "../../code/syntax/SyntaxTree";

// ex pect(运行结果).toBe(期望的结果);
// //常见断言方法
// expect({a:1}).toBe({a:1})//判断两个对象是否相等
// expect(1).not.toBe(2)//判断不等
// expect({ a: 1, foo: { b: 2 } }).toEqual({ a: 1, foo: { b: 2 } })
// expect(n).toBeNull(); //判断是否为null
// expect(n).toBeUndefined(); //判断是否为undefined
// expect(n).toBeDefined(); //判断结果与toBeUndefined相反
// expect(n).toBeTruthy(); //判断结果为true
// expect(n).toBeFalsy(); //判断结果为false
// expect(value).toBeGreaterThan(3); //大于3
// expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
// expect(value).toBeLessThan(5); //小于5
// expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
// expect(value).toBeCloseTo(0.3); // 浮点数判断相等
// expect('Christoph').toMatch(/stop/); //正则表达式判断
// expect(['one','two']).toContain('one'); //不解释

describe("Lexer", () => {
	it("should return the specified token", () => {
		const tokens = [
			[SyntaxKind.IdentifierToken, "a"],
			[SyntaxKind.IdentifierToken, "abc"],

			[SyntaxKind.NumberToken, "1"],
			[SyntaxKind.NumberToken, "123"],

			[SyntaxKind.WhiteSpaceToken, " "],
			[SyntaxKind.WhiteSpaceToken, "  "],
			[SyntaxKind.WhiteSpaceToken, "\r"],
			[SyntaxKind.WhiteSpaceToken, "\n"],
			[SyntaxKind.WhiteSpaceToken, "\r\n"],

			[SyntaxKind.PlusToken, "+"],
			[SyntaxKind.MinusToken, "-"],
			[SyntaxKind.StarToken, "*"],
			[SyntaxKind.SlashToken, "/"],
			[SyntaxKind.BangToken, "!"],
			[SyntaxKind.EqualsToken, "="],

			[SyntaxKind.AmpersandAmpersandToken, "&&"],
			[SyntaxKind.PipePipeToken, "||"],
			[SyntaxKind.BangEqualsToken, "!="],
			[SyntaxKind.EqualsEqualsToken, "=="],

			[SyntaxKind.OpenParenthesesToken, "("],
			[SyntaxKind.CloseParenthesesToken, ")"],

			[SyntaxKind.TrueKeyword, "true"],
			[SyntaxKind.FalseKeyword, "false"],
		];

		// for (const [kind, input] of tokens) {
		// 	expect(SyntaxTree.parseTokens(input).next().value.kind).toEqual(
		// 		kind
		// 	);
		// }
	});
});
