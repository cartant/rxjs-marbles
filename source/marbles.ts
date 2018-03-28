/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { TestScheduler } from "rxjs/testing/TestScheduler";
import { get } from "./configuration";
import { Context } from "./context";
import { observableMatcher } from "./matcher";

export function marbles(func: (context: Context) => any): () => any;
export function marbles<T1>(func: (context: Context, t1: T1) => any): (t1: T1) => any;
export function marbles<T1, T2>(func: (context: Context, t1: T1, t2: T2) => any): (t1: T1, t2: T2) => any;
export function marbles<T1, T2, T3>(func: (context: Context, t1: T1, t2: T2, t3: T3) => any): (t1: T1, t2: T2, t3: T3) => any;
export function marbles(func: (context: Context, ...rest: any[]) => any): (...rest: any[]) => any;
export function marbles(func: (context: Context, ...rest: any[]) => any): (...rest: any[]) => any {

    if (func.length > 1) {
        return (first: any, ...rest: any[]) => {

            const scheduler = new TestScheduler((a, b) => observableMatcher(a, b,
                get("assert"),
                get("assertDeepEqual"),
                get("frameworkMatcher")
            ));
            const context = new Context(scheduler);

            try {
                const result = func(context, first, ...rest);
                return result;
            } finally {
                context.teardown();
            }
        };
    }
    return (...rest: any[]) => {

        const scheduler = new TestScheduler((a, b) => observableMatcher(a, b,
            get("assert"),
            get("assertDeepEqual"),
            get("frameworkMatcher")
        ));
        const context = new Context(scheduler);

        try {
            const result = func(context, ...rest);
            return result;
        } finally {
            context.teardown();
        }
    };
}
