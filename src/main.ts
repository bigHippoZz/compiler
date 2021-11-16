import { createApp } from "vue";
import App from "./App.vue";
import { Parser } from "./compiler/code/main";

createApp(App).mount("#app");

const parser = new Parser("2 + 23 ");

console.log(parser);
