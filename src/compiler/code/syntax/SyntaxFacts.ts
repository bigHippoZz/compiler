import { SyntaxKind } from "./SyntaxKind";

export class SyntaxFacts {
	/**
	 * 一元表达式优先级
	 * @param kind
	 * @returns
	 */
	public static getUnaryOperatorPrecedence(kind: SyntaxKind): number {
		switch (kind) {
			case SyntaxKind.PlusToken:
			case SyntaxKind.MinusToken:
			case SyntaxKind.BangToken:
				return 6;
			default:
				return 0;
		}
	}

	public static getBinaryOperatorPrecedence(kind: SyntaxKind): number {
		switch (kind) {
			case SyntaxKind.StarToken:
			case SyntaxKind.SlashToken:
				return 5;
			case SyntaxKind.PlusToken:
			case SyntaxKind.MinusToken:
				return 4;
			case SyntaxKind.EqualsEqualsToken:
			case SyntaxKind.BangEqualsToken:
				return 3;
			case SyntaxKind.AmpersandAmpersandToken:
				return 2;
			case SyntaxKind.PipePipeToken:
				return 1;
			default:
				return 0;
		}
	}

	public static getKeywordKind(text: string) {
		switch (text) {
			case "true":
				return SyntaxKind.TrueKeyword;
			case "false":
				return SyntaxKind.FalseKeyword;
			default:
				return SyntaxKind.IdentifierToken;
		}
	}
}
