export namespace String {
	const numberRE = /\d/;
	export function isNumber(value: unknown): value is Number {
		return numberRE.test(value as string);
	}

	const whitespaceRE = /\s/;
	export function isWhitespace(value: unknown) {
		return whitespaceRE.test(value as string);
	}
}
