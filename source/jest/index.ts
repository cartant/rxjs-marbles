/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { NamedCase, UnnamedCase, _cases } from "../cases";
import { Configuration, defaults } from "../configuration";
import { Context } from "../context";
import { configure as _configure, MarblesFunction } from "../marbles";

export * from "../configuration";
export * from "../context";
export * from "../expect";
export { MarblesFunction } from "../marbles";
export * from "./fake";
export * from "./observe";

declare const describe: Function;
declare const expect: Function;
declare const test: any;

export interface CasesFunction {
  <T extends UnnamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: { [key: string]: T }
  ): void;
  <T extends NamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: T[]
  ): void;
}

export function configure(
  configuration: Configuration
): {
  cases: CasesFunction;
  marbles: MarblesFunction;
} {
  const { marbles } = _configure({
    ...defaults(),
    assertDeepEqual: (a, e) => expect(a).toEqual(e),
    frameworkMatcher: true,
    ...configuration
  });

  function cases<T extends UnnamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: { [key: string]: T }
  ): void;
  function cases<T extends NamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: T[]
  ): void;
  function cases(name: string, func: any, cases: any): void {
    describe(name, () => {
      _cases(c => {
        const t = c.only ? test.only : c.skip ? test.skip : test;
        if (func.length > 2) {
          t(
            c.name,
            marbles((m: any, second: any, ...rest: any[]) =>
              func(m, c, second, ...rest)
            )
          );
        } else {
          t(
            c.name,
            marbles((m, ...rest: any[]) => func(m, c, ...rest))
          );
        }
      }, cases);
    });
  }

  return { cases, marbles };
}

const { cases, marbles } = configure({});
export { cases, marbles };
