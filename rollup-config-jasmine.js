import config from "./rollup-config";

export default Object.assign({}, config, {
    input: "dist/jasmine/index.js",
    output: Object.assign({}, config.output, {
        file: "dist/bundles/rxjs-marbles-jasmine.umd.js",
        name: "rxjsMarblesJasmine"
    })
});
