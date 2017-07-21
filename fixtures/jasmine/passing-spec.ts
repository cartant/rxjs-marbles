/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { marbles } from "../../dist";

import "rxjs/add/operator/map";

describe("rxjs-marbles", () => {

    it("should support marble tests", marbles((m) => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^-------!";
        const expected = m.cold("--a-b-c-|");

        const destination = source;

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});
