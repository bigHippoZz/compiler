export namespace String {
	const numberRE = /\d/;
	export function isNumber(value: unknown): value is Number {
		return numberRE.test(value as string);
	}

	const whitespaceRE = /\s/;
	export function isWhitespace(value: unknown) {
		return whitespaceRE.test(value as string);
	}

	const wordRE = /\w/;
	export function isWord(value: unknown) {
		return wordRE.test(value as string);
	}
}

export function isNumber(value: unknown): value is Number {
	return typeof value === "number";
}

export namespace Object {
	/**
	 * 获取基本对象的类型
	 * @param value
	 * @returns
	 */
	export function getPrimitiveObjectType(value: unknown) {
		return typeof value;
	}
}
