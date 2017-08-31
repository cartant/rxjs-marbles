import config from "./rollup-config";

export default Object.assign({}, config, {
    external: [...config.external, "ava"],
    input: "dist/ava/index.js",
    name: "rxjsMarblesAva",
    output: Object.assign({}, config.output, { file: "dist/bundles/rxjs-marbles-ava.umd.js" })
});
