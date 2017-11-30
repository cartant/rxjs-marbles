import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
    banner: "/*MIT license https://github.com/cartant/rxjs-marbles/blob/master/LICENSE*/",
    external: [
        "rxjs/Observable",
        "rxjs/Scheduler",
        "rxjs/scheduler/animationFrame",
        "rxjs/scheduler/asap",
        "rxjs/scheduler/async",
        "rxjs/scheduler/queue",
        "rxjs/testing/ColdObservable",
        "rxjs/testing/HotObservable",
        "rxjs/testing/TestScheduler"
    ],
    globals: {
        "rxjs/Observable": "Rx",
        "rxjs/Scheduler": "Rx",
        "rxjs/scheduler/animationFrame": "Rx.Scheduler",
        "rxjs/scheduler/asap": "Rx.Scheduler",
        "rxjs/scheduler/async": "Rx.Scheduler",
        "rxjs/scheduler/queue": "Rx.Scheduler",
        "rxjs/testing/TestScheduler": "Rx"
    },
    input: "dist/index.js",
    name: "rxjsMarbles",
    onwarn: (warning, next) => {
        if (warning.code === "THIS_IS_UNDEFINED") return;
        next(warning);
    },
    output: {
        file: "dist/bundles/rxjs-marbles.umd.js",
        format: "umd",
    },
    plugins: [
        babel({ include: "node_modules/lodash-es/**" }),
        commonjs({}),
        nodeResolve({})
    ]
}
