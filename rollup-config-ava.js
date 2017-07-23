import config from "./rollup-config";

export default Object.assign({}, config, {
    dest: "dist/bundles/rxjs-marbles-ava.umd.js",
    entry: "dist/ava/index.js",
    external: [...config.external, "ava"],
    moduleName: "rxjsMarblesAva"
});
