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
			case SyntaxKind.LessToken:
			case SyntaxKind.LessOrEqualsToken:
			case SyntaxKind.GreaterToken:
			case SyntaxKind.GreaterOrEqualsToken:
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
			case "var":
				return SyntaxKind.VarKeyword;
			case "let":
			case "if":
				return SyntaxKind.IfKeyword;
			case "else":
				return SyntaxKind.ElseKeyword;
			default:
				return SyntaxKind.IdentifierToken;
		}
	}

	public static *getBinaryOperatorKinds(): IterableIterator<SyntaxKind> {
		const kinds = Object.values(SyntaxKind);
		for (const kind of kinds) {
			if (SyntaxFacts.getBinaryOperatorPrecedence(kind) > 0) {
				yield kind;
			}
		}
	}

	public static *getUnaryOperatorKinds(): IterableIterator<SyntaxKind> {
		const kinds = Object.values(SyntaxKind);
		for (const kind of kinds) {
			if (SyntaxFacts.getUnaryOperatorPrecedence(kind) > 0) {
				yield kind;
			}
		}
	}

	public static getText(kind: SyntaxKind) {
		switch (kind) {
			case SyntaxKind.PlusToken:
				return "+";
			case SyntaxKind.MinusToken:
				return "-";
			case SyntaxKind.StarToken:
				return "*";
			case SyntaxKind.SlashToken:
				return "/";
			case SyntaxKind.BangToken:
				return "!";

			case SyntaxKind.EqualsToken:
				return "=";

			case SyntaxKind.GreaterToken:
				return ">";
			case SyntaxKind.GreaterOrEqualsToken:
				return ">=";
			case SyntaxKind.LessToken:
				return "<";
			case SyntaxKind.LessOrEqualsToken:
				return "<=";

			case SyntaxKind.AmpersandAmpersandToken:
				return "&&";
			case SyntaxKind.PipePipeToken:
				return "||";
			case SyntaxKind.BangEqualsToken:
				return "!=";
			case SyntaxKind.EqualsEqualsToken:
				return "==";
			case SyntaxKind.OpenParenthesesToken:
				return "(";
			case SyntaxKind.CloseParenthesesToken:
				return ")";
			case SyntaxKind.OpenBraceToken:
				return "{";
			case SyntaxKind.CloseBraceToken:
				return "}";

			case SyntaxKind.TrueKeyword:
				return "true";
			case SyntaxKind.FalseKeyword:
				return "false";

			case SyntaxKind.VarKeyword:
				return "var";
			case SyntaxKind.LetKeyword:
				return "let";

			case SyntaxKind.IfKeyword:
				return "if";
			case SyntaxKind.ElseKeyword:
				return "else";

			default:
				return null;
		}
	}
}
