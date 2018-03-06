/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import { expect } from "chai";
import { cases, marbles } from "../../dist/mocha";

import "rxjs/add/operator/delay";
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

    it("should support marble tests with class-instance values", marbles((m) => {

        class Thing {
            constructor(public value: number) {}
        }

        const values = {
            a: new Thing(1),
            b: new Thing(2),
            c: new Thing(3),
            d: new Thing(4)
        };

        const source =  m.hot("--^-a-b-c-|", values);
        const subs =            "^-------!";
        const expected = m.cold("--b-c-d-|", values);

        const destination = source.map((thing) => new Thing(thing.value + 1));

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

    it("should support unsubscriptions", marbles((m) => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^----!";
        const unsubs =          "-----!";
        const expected = m.cold("--a-b-");

        const destination = source;

        m.expect(destination, unsubs).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support unsubscriptions with values", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };

        const source =  m.hot("--^-a-b-c-|", values);
        const subs =            "^----!";
        const unsubs =          "-----!";
        const expected = m.cold("--b-c-", values);

        const destination = source.map((value) => value + 1);

        m.expect(destination, unsubs).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support string-based assertions with unsubscriptions", marbles((m) => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^----!";
        const unsubs =          "-----!";
        const expected =        "--a-b-";

        const destination = source;

        m.expect(destination, unsubs).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support string-based assertions with unsubscriptions and values", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };

        const source =  m.hot("--^-a-b-c-|", values);
        const subs =            "^----!";
        const unsubs =          "-----!";
        const expected =        "--b-c-";

        const destination = source.map((value) => value + 1);

        m.expect(destination, unsubs).toBeObservable(expected, values);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support binding non-test schedulers", marbles((m) => {

        m.bind();

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^--------!";
        const expected =        "---a-b-c-|";

        const destination = source.delay(m.time("-|"));

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
        const destination = source.map((value) => value + 1);

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

    it("should support promises", marbles((m) => {

        return Promise.resolve().then(() => expect(m).to.be.an("object"));
    }));
});
