/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import * as tape from "tape";
import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Context } from "../context";
import { marbles as _marbles } from "../marbles";

export { configure } from "../configuration";
export * from "../context";
export * from "../expect";

export function cases<T extends UnnamedCase>(name: string, func: (context: Context, _case: T, t: tape.Test) => void, cases: { [key: string]: T }): void;
export function cases<T extends NamedCase>(name: string, func: (context: Context, _case: T, t: tape.Test) => void, cases: T[]): void;
export function cases(name: string, func: any, cases: any): void {

    _cases((c) => {
        const t = c.only ? tape.only : c.skip ? tape.skip : tape;
        t(`${name} / ${c.name}`, marbles((m, t) => func(m, c, t)));
    }, cases);
}

export function marbles(func: (m: Context, t: tape.Test) => void): any {

    return _marbles<tape.Test>((m, t) => {
        m.configure({
            assert: t.ok.bind(t),
            assertDeepEqual: t.deepEqual.bind(t)
        });
        func(m, t);
    });
}
