/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import * as tape from "tape";
import { Context } from "../context";
import { marbles as _marbles } from "../marbles";

export { configure } from "../configuration";
export * from "../context";
export * from "../expect";

export function marbles(test: (m: Context, t: tape.Test) => void): any {

    return _marbles<tape.Test>((m, t) => {
        m.configure({
            assert: t.ok.bind(t),
            assertDeepEqual: t.deepEqual.bind(t)
        });
        test(m, t);
    });
}
