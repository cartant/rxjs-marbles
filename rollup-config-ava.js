import config from "./rollup-config";

export default Object.assign({}, config, {
    external: [...config.external, "ava"],
    globals: Object.assign({}, config.globals, { "ava": "unsupported" }),
    input: "dist/ava/index.js",
    name: "rxjsMarblesAva",
    output: Object.assign({}, config.output, { file: "dist/bundles/rxjs-marbles-ava.umd.js" })
});
