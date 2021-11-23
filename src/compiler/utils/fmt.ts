import { SyntaxNode } from "../code/syntax/SyntaxNode";

export class FormatTree {
	public static formatSyntaxTree(tree: SyntaxNode) {
		let result: string[] = [];
		function loop(
			tree: SyntaxNode,
			indent: string = "",
			isLast: boolean = true,
			whitespace = "<span>&nbsp;</span>"
		) {
			const marker = isLast ? "└──" : "├──";
			result.push(
				`<span style=color:${
					tree.name.includes("Token") ? "#B85252" : " "
				}>${whitespace}${marker} &lt;${
					tree.kind
					// @ts-ignore
				}&gt; <span>${JSON.stringify([tree?.text]) ?? ""}</span></span>`
			);
			whitespace += isLast
				? "<span>&nbsp;</span>".repeat(4)
				: "|" + "<span>&nbsp;</span>".repeat(3);
			indent += isLast ? "      " : "|     ";
			const lastChildren =
				tree.getChildren()[tree.getChildren().length - 1];

			tree.getChildren().forEach((child) => {
				loop(child, indent, lastChildren === child, whitespace);
			});
		}
		loop(tree);
		return result;
	}
}
