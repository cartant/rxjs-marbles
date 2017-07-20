import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
    banner: "/*MIT license https://github.com/cartant/rxjs-marbles/blob/master/LICENSE*/",
    dest: "dist/bundles/rxjs-marbles.umd.js",
    entry: "dist/index.js",
    external: [
        "rxjs/Observable",
        "rxjs/testing/ColdObservable",
        "rxjs/testing/HotObservable",
        "rxjs/testing/TestScheduler"
    ],
    format: "umd",
    globals: {
        "rxjs/Observable": "Rx",
        "rxjs/testing/TestScheduler": "Rx"
    },
    moduleName: "rxjsMarbles",
    onwarn: (warning, next) => {
        if (warning.code === "THIS_IS_UNDEFINED") return;
        next(warning);
    },
    plugins: [
        babel({ include: "node_modules/lodash-es/**" }),
        commonjs({}),
        nodeResolve({})
    ]
}
