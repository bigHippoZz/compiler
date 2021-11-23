<template>
	<div ref="termContainer"></div>
	<!-- <a-row>
		<a-col :span="18">
			<a-textarea
				v-model="input"
				placeholder="Please enter something"
				allow-clear
				auto-size
			/>
		</a-col>
		<a-col :span="6">
			<a-button type="primary" @click="show = !show">{{
				show ? "close" : "open"
			}}</a-button>
		</a-col>
	</a-row>
	<div v-show="show">
		<div
			class="treeNode"
			v-html="item"
			v-for="item in tree"
			:key="item"
		></div>
	</div>
	<a-alert v-for="item in alert" :key="item" type="error">{{ item }}</a-alert>
	<a-divider /> 
	<h1>{{ result }}</h1> -->
</template>

<script setup lang="ts">
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import { SyntaxTree } from "./compiler/code/syntax/SyntaxTree";
import { FormatTree } from "./compiler/utils/fmt";
import { onMounted, ref, unref, watch } from "vue";

import { Compilation } from "./compiler/code/Compilation";
import { Diagnostic } from "./compiler/code/Diagnostic";

const terminal = new Terminal();
const fitAddon = new FitAddon();

const termContainer = ref<HTMLElement | null>(null);
onMounted(() => {
	var term = new Terminal();
	term.open(termContainer.value!);
	term.onData(function (data) {
		console.log(data);
	});
});

function useProcessor() {
	const input = ref<string>("");
	const tree = ref<string[]>([]);
	const alert = ref<Diagnostic[]>([]);
	const result = ref<number>(0);

	watch(
		() => unref(input),

		(value) => {
			const ast = SyntaxTree.parse(unref(value));

			tree.value = FormatTree.formatSyntaxTree(ast.root);

			const evaluate = new Compilation(ast).evaluate();

			result.value = evaluate.value;

			alert.value = evaluate.diagnostics;
		}
	);

	return {
		input,
		tree,
		alert,
		result,
	};
}

const show = ref<boolean>(true);

const { input, tree, alert, result } = useProcessor();
</script>

<style>
* {
	margin: 0;
	padding: 0;
	font-family: Monaco;
}
.treeNode {
	font-size: 20px;
	line-height: 2;
}
</style>
