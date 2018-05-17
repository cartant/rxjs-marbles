/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { test, TestContext } from "ava";
import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Context } from "../context";
import { configure } from "../marbles";

export * from "../configuration";
export * from "../context";
export * from "../expect";

export const marbles: (func: (m: Context, t: TestContext) => any) => any = configure((t: TestContext) => ({
    assert: t.truthy.bind(t),
    assertDeepEqual: t.deepEqual.bind(t)
}));

export function cases<T extends UnnamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: { [key: string]: T }): void;
export function cases<T extends NamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: T[]): void;
export function cases(name: string, func: any, cases: any): void {

    _cases((c) => {
        const t = c.only ? test.only : c.skip ? test.skip : test;
        t(`${name} / ${c.name}`, marbles((m, t) => func(m, c, t)));
    }, cases);
}
