/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { test, TestContext } from "ava";
import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Context } from "../context";
import { marbles as _marbles } from "../marbles";

export { configure } from "../configuration";
export * from "../context";
export * from "../expect";

export function cases<T extends UnnamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: { [key: string]: T }): void;
export function cases<T extends NamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: T[]): void;
export function cases(name: string, func: any, cases: any): void {

    _cases((c) => {
        const t = c.only ? test.only : c.skip ? test.skip : test;
        t(`${name} / ${c.name}`, marbles((m, t) => func(m, c, t)));
    }, cases);
}

export function marbles(func: (m: Context, t: TestContext) => any): any {

    return _marbles<TestContext>((m, t) => {
        m.configure({
            assert: t.truthy.bind(t),
            assertDeepEqual: t.deepEqual.bind(t)
        });
        return func(m, t);
    });
}
