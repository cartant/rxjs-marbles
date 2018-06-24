/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { test, TestContext } from "ava";
import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Configuration, defaults } from "../configuration";
import { Context } from "../context";
import { fakeSchedulers as _fakeSchedulers } from "../fake";
import { configure as _configure } from "../marbles";

export * from "../configuration";
export * from "../context";
export * from "../expect";
export * from "../fake";

export interface CasesFunction {
    <T extends UnnamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: { [key: string]: T }): void;
    <T extends NamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: T[]): void;
}

export type MarblesFunction = (func: (m: Context, t: TestContext) => any) => any;

export function configure(configuration: Configuration): {
    cases: CasesFunction,
    marbles: MarblesFunction
} {
    const factory = (t: TestContext) => ({
        assert: t.truthy.bind(t),
        assertDeepEqual: t.deepEqual.bind(t)
    });
    const configured = _configure((t: TestContext) => ({
        ...configuration,
        ...factory(t)
    }));
    const marbles: MarblesFunction = configured.marbles;

    function cases<T extends UnnamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: { [key: string]: T }): void;
    function cases<T extends NamedCase>(name: string, func: (context: Context, _case: T, t: TestContext) => void, cases: T[]): void;
    function cases(name: string, func: any, cases: any): void {

        _cases((c) => {
            const t = c.only ? test.only : c.skip ? test.skip : test;
            t(`${name} / ${c.name}`, marbles((m, t) => func(m, c, t)));
        }, cases);
    }

    return { cases, marbles };
}

const { cases, marbles } = configure(defaults());
export { cases, marbles };

export function fakeSchedulers(fakeTest: (t: TestContext) => any): (t: TestContext) => any {
    return _fakeSchedulers(fakeTest);
}
