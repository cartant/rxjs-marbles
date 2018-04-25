/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { map } from "rxjs/operators";
import { marbles } from "../../dist/jest";

if (process.env.FAILING !== "0") {

    test("it should fail", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };

        const source =  m.hot("--^-a-b-c-|", values);
        const subs =            "^-------!";
        const expected = m.cold("--a-a-a-|", values);

        const destination = source.pipe(map((value) => value + 1));

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

} else {

    test("it should pass", () => {});
}
