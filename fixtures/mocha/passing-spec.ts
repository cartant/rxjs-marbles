/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { marbles } from "../../dist";

import "rxjs/add/operator/map";

describe("rxjs-marbles", () => {

    it("should support marble tests without values", marbles((m) => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^-------!";
        const expected = m.cold("--a-b-c-|");

        const destination = source;

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with values", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };

        const source =  m.hot("--^-a-b-c-|", values);
        const subs =            "^-------!";
        const expected = m.cold("--b-c-d-|", values);

        const destination = source.map((value) => value + 1);

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with errors", marbles((m) => {

        const source =  m.hot("--^-a-b-c-#");
        const subs =            "^-------!";
        const expected = m.cold("--a-b-c-#");

        const destination = source;

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with explicit errors", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };

        const source =  m.hot("--^-a-b-c-#", values, new Error("Boom!"));
        const subs =            "^-------!";
        const expected = m.cold("--b-c-d-#", values, new Error("Boom!"));

        const destination = source.map((value) => value + 1);

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support string-based assertions", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };

        const source =  m.hot("--^-a-b-c-|", values);
        const subs =            "^-------!";
        const expected =        "--b-c-d-|";

        const destination = source.map((value) => value + 1);

        m.expect(destination).toBeObservable(expected, values);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});
