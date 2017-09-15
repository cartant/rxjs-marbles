/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { test } from "ava";
import { marbles } from "../dist/ava";

import "rxjs/add/operator/map";

if (process.env.FAILING !== "0") {

    test("it should fail", marbles((m, t) => {

        t.plan(2);

        const values = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };

        const source =  m.hot("--^-a-b-c-|", values);
        const subs =            "^-------!";
        const expected = m.cold("--a-a-a-|", values);

        const destination = source.map((value) => value + 1);

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

} else {

    test("it should pass", (t) => { t.plan(0); });
}
