/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import isArray from "lodash-es/isArray";

export interface UnnamedCase {
    [key: string]: any;
    only?: boolean;
    skip?: boolean;
}

export interface NamedCase extends UnnamedCase {
    name: string;
}

export function _cases<T extends UnnamedCase>(adapter: (c: NamedCase) => void, cases: { [key: string]: T }): void;
export function _cases<T extends NamedCase>(adapter: (c: NamedCase) => void, cases: T[]): void;
export function _cases(adapter: (c: NamedCase) => void, cases: any): void {

    if (!isArray(cases)) {
        cases = Object.keys(cases).map((key) => ({ ...cases[key], name: key }));
    }
    cases.forEach(adapter);
}
