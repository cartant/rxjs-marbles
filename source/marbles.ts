/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { TestScheduler } from "rxjs/testing/TestScheduler";
import { get } from "./configuration";
import { Context } from "./context";
import { observableMatcher } from "./matcher";

export function marbles(test: (context: Context) => any): () => any;
export function marbles<T1>(test: (context: Context, t1: T1) => any): (t1: T1) => any;
export function marbles<T1, T2>(test: (context: Context, t1: T1, t2: T2) => any): (t1: T1, t2: T2) => any;
export function marbles<T1, T2, T3>(test: (context: Context, t1: T1, t2: T2, t3: T3) => any): (t1: T1, t2: T2, t3: T3) => any;
export function marbles(test: (context: Context, ...args: any[]) => any): (...args: any[]) => any {

    return (...args: any[]) => {

        const scheduler = new TestScheduler((a, b) => observableMatcher(a, b, get("assert"), get("assertDeepEqual")));
        const context = new Context(scheduler);
        test.apply(null, [context].concat(args));
        if (context.autoFlush) {
            scheduler.flush();
        }
    };
}
