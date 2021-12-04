export enum BoundBinaryOperatorKind {
	/**
	 * 加法
	 */
	Addition,
	/**
	 * 减法
	 */
	Subtraction,
	/**
	 * 乘法
	 */
	Multiplication,
	/**
	 * 除法
	 */
	Division,

	LogicalAnd,

	LogicalOr,

	Equals,

	NotEquals,

	/**
	 *  <
	 */
	Less,
	/**
	 * <=
	 */
	LessOrEquals,
	/**
	 *  >
	 */
	Greater,
	/**
	 * >=
	 */
	GreaterOrEquals,
}
