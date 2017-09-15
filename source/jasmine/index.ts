/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Context } from "../context";
import { marbles } from "../marbles";

export { configure } from "../configuration";
export * from "../context";
export * from "../expect";
export * from "../marbles";

declare const describe: Function;
declare const fit: Function;
declare const it: Function;
declare const xit: Function;

export function cases<T extends UnnamedCase>(name: string, func: (context: Context, options: T) => void, cases: { [key: string]: T }): void;
export function cases<T extends NamedCase>(name: string, func: (context: Context, options: T) => void, cases: T[]): void;
export function cases(name: string, func: any, cases: any): void {

    describe(name, () => {
        _cases((c) => {
            const t = c.only ? fit : c.skip ? xit : it;
            t(c.name, marbles((m) => func(m, c)));
        }, cases);
    });
}
