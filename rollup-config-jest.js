import config from "./rollup-config";

export default Object.assign({}, config, {
    input: "dist/jest/index.js",
    name: "rxjsMarblesJest",
    output: Object.assign({}, config.output, { file: "dist/bundles/rxjs-marbles-jest.umd.js" })
});
