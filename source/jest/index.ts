/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Context } from "../context";
import { configure } from "../marbles";

export * from "../configuration";
export * from "../context";
export * from "../expect";
import { MarblesFunction } from "../marbles";

declare const describe: Function;
declare const expect: Function;
declare const test: any;

export const marbles = configure({
    assertDeepEqual: (a, e) => expect(a).toEqual(e),
    frameworkMatcher: true
});

export function cases<T extends UnnamedCase>(name: string, func: (context: Context, _case: T) => void, cases: { [key: string]: T }): void;
export function cases<T extends NamedCase>(name: string, func: (context: Context, _case: T) => void, cases: T[]): void;
export function cases(name: string, func: any, cases: any): void {

    describe(name, () => {
        _cases((c) => {
            const t = c.only ? test.only : c.skip ? test.skip : test;
            if (func.length > 2) {
                t(c.name, marbles((m: any, second: any, ...rest: any[]) => func(m, c, second, ...rest)));
            } else {
                t(c.name, marbles((m, ...rest: any[]) => func(m, c, ...rest)));
            }
        }, cases);
    });
}
