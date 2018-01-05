import config from "./rollup-config";

export default Object.assign({}, config, {
    input: "dist/jest/index.js",
    output: Object.assign({}, config.output, {
        file: "dist/bundles/rxjs-marbles-jest.umd.js",
        name: "rxjsMarblesJest"
    })
});
