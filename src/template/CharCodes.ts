export enum CharCodes {
	/**
	 *  \t
	 */
	Tab = 0x9,
	/**
	 * \n
	 */
	NewLine = 0xa,
	/**
	 * \f
	 */
	FormFeed = 0xc,
	/**
	 *  \r
	 */
	CarriageReturn = 0xd,
	/**
	 * ' '
	 */
	Space = 0x20,
	/**
	 * ! 感叹号
	 */
	ExclamationMark = 0x21,
	/**
	 * '#'
	 */
	Num = 0x23,
	/**
	 * '&'
	 */
	Amp = 0x26,
	/**
	 * "'"
	 */
	SingleQuote = 0x27,
	/**
	 *  """
	 */
	DoubleQuote = 0x22,
	/**
	 * "-"
	 */
	Dash = 0x2d,
	/**
	 *  "/"
	 */
	Slash = 0x2f,
	/**
	 * 0
	 */
	Zero = 0x30,
	/**
	 * 9
	 */
	Nine = 0x39,
	/**
	 *  ?
	 */
	QuestionMark = 0x3f,
	/**
	 * ";" 分号
	 */
	Semi = 0x3b,
	/**
	 * <
	 */
	LowerToken = 0x3c,
	/**
	 * =
	 */
	EqualsToken = 0x3d,
	/**
	 * >
	 */
	GreaterToken = 0x3e,
	/**
	 * "A"
	 */
	UpperA = 0x41,
	/**
	 * "a"
	 */
	LowerA = 0x61,
	/**
	 * "F"
	 */
	UpperF = 0x46,
	/**
	 * "f"
	 */
	LowerF = 0x66,
	/**
	 * "Z"
	 */
	UpperZ = 0x5a,
	/**
	 * "z"
	 */
	LowerZ = 0x7a,
	/**
	 * "x"
	 */
	LowerX = 0x78,
	/**
	 * "["
	 */
	OpeningSquareBracket = 0x5b,
}

/**
 * 判断是不是空字符串
 * @param code
 */
export const isWhitespace = (code: number): boolean => {
	return (
		code === CharCodes.Tab ||
		code === CharCodes.NewLine ||
		code === CharCodes.FormFeed ||
		code === CharCodes.CarriageReturn ||
		code === CharCodes.Space
	);
};

/**
 * 判断是不是数字
 * @param code
 */
export const isNumber = (code: number): boolean => {
	return code <= CharCodes.Nine && code >= CharCodes.Zero;
};

/**
 * <div>HelloWorld</div>
 *
 * 判断是不是结束符
 * @param code
 */
export const isEndOfTagSection = (code: number): boolean => {
	return (
		code === CharCodes.GreaterToken ||
		code === CharCodes.Slash ||
		isWhitespace(code)
	);
};

/**
 * 判断是不是ASCII码
 * @param code
 * @returns
 */
export const isASCIIAlpha = (code: number): boolean => {
	return (
		(code >= CharCodes.LowerA && code <= CharCodes.LowerZ) ||
		(code >= CharCodes.UpperA && code <= CharCodes.UpperZ)
	);
};
