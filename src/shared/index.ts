export namespace StringTools {
	export const numberRE: RegExp = /\d/;
	export function isNumber(value: unknown): value is Number {
		return numberRE.test(value as string);
	}

	export const whitespaceRE = /\s/;
	export function isWhitespace(value: unknown) {
		return whitespaceRE.test(value as string);
	}

	export const wordRE = /\w/;
	export function isWord(value: unknown) {
		return wordRE.test(value as string);
	}
}

export function isNumber(value: unknown): value is Number {
	return typeof value === "number";
}

export namespace ObjectTools {
	/**
	 * 获取基本对象的类型
	 * @param value
	 * @returns
	 */
	export function getPrimitiveObjectType(value: unknown) {
		return typeof value;
	}
}
