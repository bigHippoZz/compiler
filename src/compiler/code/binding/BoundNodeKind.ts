export enum BoundNodeKind {
	/**
	 * statements
	 */
	BlockStatement = "BlockStatement",
	ExpressionStatement = "ExpressionStatement",

	/**
	 * expression
	 */
	UnaryExpression = "UnaryExpression",
	LiteralExpression = "LiteralExpression",
	BinaryExpression = "BinaryExpression",
	VariableExpression = "VariableExpression",
	AssignmentExpression = "AssignmentExpression",
	VariableDeclaration = "VariableDeclaration",
}
