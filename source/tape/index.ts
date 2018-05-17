/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import * as tape from "tape";
import { _cases, NamedCase, UnnamedCase } from "../cases";
import { Configuration, defaults } from "../configuration";
import { Context } from "../context";
import { configure as _configure } from "../marbles";

export * from "../configuration";
export * from "../context";
export * from "../expect";

export interface CasesFunction {
    <T extends UnnamedCase>(name: string, func: (context: Context, _case: T, t: tape.Test) => void, cases: { [key: string]: T }): void;
    <T extends NamedCase>(name: string, func: (context: Context, _case: T, t: tape.Test) => void, cases: T[]): void;
}

export type MarblesFunction = (func: (m: Context, t: tape.Test) => any) => any;

export function configure(configuration: Configuration): {
    cases: CasesFunction,
    marbles: MarblesFunction
} {
    const factory = (t: tape.Test) => ({
        assert: t.ok.bind(t),
        assertDeepEqual: t.deepEqual.bind(t)
    });
    const configured = _configure((t: tape.Test) => ({
        ...configuration,
        ...factory(t)
    }));
    const marbles: MarblesFunction = configured.marbles;

    function cases<T extends UnnamedCase>(name: string, func: (context: Context, _case: T, t: tape.Test) => void, cases: { [key: string]: T }): void;
    function cases<T extends NamedCase>(name: string, func: (context: Context, _case: T, t: tape.Test) => void, cases: T[]): void;
    function cases(name: string, func: any, cases: any): void {

        _cases((c) => {
            const t = c.only ? tape.only : c.skip ? tape.skip : tape;
            t(`${name} / ${c.name}`, marbles((m, t) => func(m, c, t)));
        }, cases);
    }

    return { cases, marbles };
}

const configured = configure(defaults());
export const cases = configured.cases;
export const marbles = configured.marbles;
