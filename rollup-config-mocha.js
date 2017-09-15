import config from "./rollup-config";

export default Object.assign({}, config, {
    input: "dist/mocha/index.js",
    name: "rxjsMarblesMocha",
    output: Object.assign({}, config.output, { file: "dist/bundles/rxjs-marbles-mocha.umd.js" })
});
