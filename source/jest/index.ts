/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Context } from "../context";
import { marbles as _marbles } from "../marbles";

export { configure } from "../configuration";
export * from "../context";
export * from "../expect";

declare const describe: Function;
declare const expect: Function;
declare const test: any;

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

export function marbles(func: (m: Context, ...rest: any[]) => void): any {

    return _marbles((m: Context, ...rest: any[]) => {
        m.configure({
            assertDeepEqual: (a, e) => expect(a).toEqual(e),
            frameworkMatcher: true
        });
        func(m, ...rest);
    });
}
