/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Configuration, defaults } from "../configuration";
import { Context } from "../context";
import { fakeSchedulers as _fakeSchedulers } from "../fake";
import { configure as _configure, MarblesFunction } from "../marbles";

export * from "../configuration";
export * from "../context";
export * from "../expect";
export * from "../fake";
export { MarblesFunction } from "../marbles";
export * from "./observe";

declare const describe: Function;
declare const fit: Function;
declare const it: Function;
declare const xit: Function;

export interface CasesFunction {
    <T extends UnnamedCase>(name: string, func: (context: Context, _case: T) => void, cases: { [key: string]: T }): void;
    <T extends NamedCase>(name: string, func: (context: Context, _case: T) => void, cases: T[]): void;
}

export function configure(configuration: Configuration): {
    cases: CasesFunction,
    marbles: MarblesFunction
} {
    const { marbles } = _configure(configuration);

    function cases<T extends UnnamedCase>(name: string, func: (context: Context, _case: T) => void, cases: { [key: string]: T }): void;
    function cases<T extends NamedCase>(name: string, func: (context: Context, _case: T) => void, cases: T[]): void;
    function cases(name: string, func: any, cases: any): void {

        describe(name, () => {
            _cases((c) => {
                const t = c.only ? fit : c.skip ? xit : it;
                if (func.length > 2) {
                    t(c.name, marbles((m: any, second: any, ...rest: any[]) => func(m, c, second, ...rest)));
                } else {
                    t(c.name, marbles((m, ...rest: any[]) => func(m, c, ...rest)));
                }
            }, cases);
        });
    }

    return { cases, marbles };
}

const { cases, marbles } = configure(defaults());
export { cases, marbles };

export function fakeSchedulers(fakeTest: () => any): () => any {
    return _fakeSchedulers(fakeTest);
}
