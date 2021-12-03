import { TextSpan } from "./text/TextSpan";

export class Diagnostic {
	constructor(
		public readonly textSpan: TextSpan,
		public readonly message: string
	) {}

	public toString(): string {
		return this.message;
	}
}
