/**
 * <div data-name="a" ></div>
 *
 */
export enum SyntaxStatus {
	/**
	 * 文字
	 */
	Text = 1,
	/**
	 * 扫描到标签开始前
	 */
	BeforeTagName,
	/**
	 * 扫描到标签中
	 */
	InTagName,

	/**
	 * 扫描到自闭合标签中
	 */
	InSelfClosingTag,

	/**
	 * 扫描到结束结束标签前
	 */
	BeforeClosingTagName,
	/**
	 * 扫描到结束标签中
	 */
	InClosingTag,
	/**
	 * 扫描到结束标签后
	 */
	AfterClosingTagName,

	////////////////////////////////
	// attributes 属性
	////////////////////////////////

	/**
	 * 扫描到属性名前
	 */
	BeforeAttributeName,
	/**
	 * 扫描到属性名中
	 */
	InAttributeName,
	/**
	 * 扫描到属性名之后
	 */
	AfterAttributeName,
	/**
	 * 扫描到属性值前
	 */
	BeforeAttributeValue,
	/**
	 * 扫描到属性值的中
	 */
	InAttributeValueDq, // "
	InAttributeValueSq, // '
	InAttributeValueNq,
}
