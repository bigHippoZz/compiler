export enum SyntaxKind {
	////////////////////////////////////////////////////////////////
	/// Tokens
	////////////////////////////////////////////////////////////////
	/**
	 * 无法识别的token
	 */
	BadToken = "BadToken",
	/**
	 * 句法结束token
	 */
	EndOfFileToken = "EndOfFileToken",

	IdentifierToken = "IdentifierToken",

	/**
	 * 数字
	 */
	NumberToken = "NumberToken",
	/**
	 * 空格
	 */
	WhiteSpaceToken = "WhiteSpaceToken",
	/**
	 *  + 运算符
	 */
	PlusToken = "PlusToken",
	/**
	 *  - 运算符
	 */
	MinusToken = "MinusToken",
	/**
	 *  * 运算符
	 */
	StarToken = "StarToken",
	/**
	 *  / 运算符
	 */
	SlashToken = "SlashToken",

	/**
	 * ! 感叹号
	 */
	BangToken = "BangToken",
	/**
	 *  &&
	 */
	AmpersandAmpersandToken = "AmpersandAmpersandToken",
	/**
	 *  ||
	 */
	PipePipeToken = "PipePipeToken",
	/**
	 *  !=
	 */
	BangEqualsToken = "BangEqualsToken",
	/**
	 *  ==
	 */
	EqualsEqualsToken = "EqualsEqualsToken",
	/**
	 *  ( 括号
	 */
	OpenParenthesesToken = "OpenParenthesesToken",
	/**
	 *  ) 括号
	 */
	CloseParenthesesToken = "CloseParenthesesToken",

	/**
	 *  =
	 */
	EqualsToken = "EqualsToken",

	////////////////////////////////////////////////////////////////
	///  expression
	////////////////////////////////////////////////////////////////
	/**
	 * 数字表达式
	 */
	LiteralExpression = "LiteralExpression",
	/**
	 * 基本表达式
	 */
	BinaryExpression = "BinaryExpression",
	/**
	 * 括号表达式
	 */
	ParenthesizedExpression = "ParenthesizedExpression",
	/**
	 *  一元表达式
	 */
	UnaryExpression = "UnaryExpression",

	NamedExpression = "NamedExpression",

	AssignmentExpression = "AssignmentExpression",

	////////////////////////////////////////////////////////////////
	///  keywords
	////////////////////////////////////////////////////////////////
	TrueKeyword = "TrueKeyword",

	FalseKeyword = "FalseKeyword",
}
