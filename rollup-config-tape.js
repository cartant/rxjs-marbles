import config from "./rollup-config";

export default Object.assign({}, config, {
    dest: "dist/bundles/rxjs-marbles-tape.umd.js",
    entry: "dist/tape/index.js",
    external: [...config.external, "tape"],
    moduleName: "rxjsMarblesTape"
});
