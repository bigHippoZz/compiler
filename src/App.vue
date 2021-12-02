<template>
	<a-row>
		<a-col :span="18">
			<a-textarea
				v-model="input"
				placeholder="Please enter something"
				allow-clear
				auto-size
				@keyup="execution"
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
	<h1>{{ result }}</h1>
</template>

<script setup lang="ts">
import { SyntaxTree } from "./compiler/code/syntax/SyntaxTree";

import { FormatTree } from "./compiler/utils/fmt";

import { ref, unref } from "vue";

import { Compilation } from "./compiler/code/Compilation";

import { Diagnostic } from "./compiler/code/Diagnostic";

const show = ref<boolean>(true);

const input = ref<string>("");
const tree = ref<string[]>([]);
const alert = ref<Diagnostic[]>([]);
const result = ref<number>(0);

const globalVariables = new Map();

let previous: Compilation | null = null;

const execution = function (event: KeyboardEvent) {
	if (event.code.toLowerCase() !== "enter") return;
	console.clear();
	////////////////////  前端  ////////////////
	const ast = SyntaxTree.parse(unref(input));
	tree.value = FormatTree.formatSyntaxTree(ast.root);
	////////////////////////////////////////////

	console.log("[AbstractSyntaxTree] =>", ast.root);

	////////////////////  后端  ////////////////
	const compilation = !previous
		? new Compilation(ast)
		: previous.continueWith(ast);

	const evaluate = compilation.evaluate(globalVariables);
	////////////////////////////////////////////

	previous = compilation;

	console.log("[GlobalVariables] =>", globalVariables);

	console.log("[Compilation] =>", previous);

	result.value = evaluate.value;

	alert.value = evaluate.diagnostics;
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	font-family: Monaco;
}
.treeNode {
	font-size: 18px;
	line-height: 1.8;
}
</style>
