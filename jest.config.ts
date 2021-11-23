import type { Config } from "@jest/types";
const conf: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src/"],
	verbose: true,
};
export default conf;
