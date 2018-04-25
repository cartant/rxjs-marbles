/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import { map } from "rxjs/operators";
import { cases, marbles } from "../../dist/jest";

test("it should support marble tests", marbles((m) => {

    const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
    };

    const source =  m.hot("--^-a-b-c-|", values);
    const subs =            "^-------!";
    const expected = m.cold("--b-c-d-|", values);

    const destination = source.pipe(map((value) => value + 1));

    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));

cases("should support cases", (m, c) => {

    const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
    };

    const source =  m.hot(c.s, values);
    const expected = m.cold(c.e, values);
    const destination = source.pipe(map((value) => value + 1));

    m.expect(destination).toBeObservable(expected);
}, {
    "non-empty": {
        s: "-a-b-c-|",
        e: "-b-c-d-|"
    },
    "empty": {
        s: "-|",
        e: "-|"
    }
});

test("it should support promises", marbles((m) => {

    return Promise.resolve().then(() => expect(typeof m).toEqual("object"));
}));
