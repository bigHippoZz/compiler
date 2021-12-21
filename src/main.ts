import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import * as common from "./compiler/angluar/compiler/src/compiler";
import "@arco-design/web-vue/dist/arco.css";
import {
	ParseSourceSpan,
	R3ComponentMetadataFacade,
	R3QueryMetadataFacade,
	R3UsedDirectiveMetadata,
	ViewEncapsulation,
} from "./compiler/angluar/compiler/src/compiler_facade_interface";

const app = createApp(App);

app.use(ArcoVue);

app.mount("#app");

console.log(common);

class Component implements R3ComponentMetadataFacade {
	template: string;
	preserveWhitespaces: boolean = true;
	animations: unknown[] | undefined;
	pipes: Map<string, any> = new Map();
	directives: R3UsedDirectiveMetadata[] = [];
	styles: string[] = [];
	encapsulation: ViewEncapsulation = ViewEncapsulation.None;
	viewProviders: unknown[] | null = null;
	interpolation?: [string, string] | undefined;
	changeDetection?: number | undefined;
	name: string = "Header";
	type: Function = function () {};
	typeSourceSpan: ParseSourceSpan = {} as ParseSourceSpan;
	selector: string | null = null;
	queries: R3QueryMetadataFacade[] = [];
	host: { [key: string]: string } = {};
	propMetadata: { [key: string]: unknown[] } = {};
	lifecycle: { usesOnChanges: boolean } = { usesOnChanges: false };
	inputs: string[] = [];
	outputs: string[] = [];
	usesInheritance: boolean = true;
	exportAs: string[] | null = null;
	providers: unknown[] | null = null;
	viewQueries: R3QueryMetadataFacade[] = [];
	constructor() {
		this.template = `

		<button (click)="onSave()">保存</button>


		<div>{{ 1< a >1 }}</div>

		<div *ngIf="currentUser">Hello,{{currentUser.firstName}}</div>

		<div *ngFor="let user of [1,23,4]">{{user.fullName}}</div>

		`;
	}
}
const compilerImp = common.publishFacade(window);

console.log(compilerImp);

compilerImp.compileComponent(
	{
		ɵɵdefineComponent: "1",
		ɵɵInheritDefinitionFeature: "2",
		ɵɵtext: "3",
		ɵɵelementStart: 4,
		ɵɵelementEnd: 5,
		ɵɵadvance: 6,
		ɵɵtextInterpolate1: 7,
		ɵɵnextContext: 8,
		ɵɵtemplate: 9,
		ɵɵpureFunction0: 10,
		ɵɵproperty: 11,
		ɵɵlistener: "12",
		ɵɵtextInterpolate: 13,
	},
	"/",
	new Component(),
);

function a() {}
