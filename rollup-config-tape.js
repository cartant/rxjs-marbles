import config from "./rollup-config";

export default Object.assign({}, config, {
    external: [...config.external, "tape"],
    input: "dist/tape/index.js",
    name: "rxjsMarblesTape",
    output: Object.assign({}, config.output, { file: "dist/bundles/rxjs-marbles-tape.umd.js" })
});
