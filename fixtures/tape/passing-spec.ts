/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import * as tape from "tape";
import { cases, marbles } from "../../dist/tape";

import "rxjs/add/operator/map";

tape("it should support marble tests", marbles((m, t) => {

    t.plan(2);

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

tape("it should support marble tests with terse assertions", marbles((m, t) => {

    t.plan(2);

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

    m.equal(destination, expected);
    m.has(source, subs);
}));

tape("it should support string-based assertions", marbles((m, t) => {

    t.plan(2);

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

    m.equal(destination, expected, values);
    m.has(source, subs);
}));

tape("should support unsubscriptions", marbles((m, t) => {

    t.plan(2);

    const source =  m.hot("--^-a-b-c-|");
    const subs =            "^----!";
    const unsubs =          "-----!";
    const expected = m.cold("--a-b-");

    const destination = source;

    m.equal(destination, unsubs, expected);
    m.has(source, subs);
}));

tape("should support unsubscriptions with values", marbles((m, t) => {

    t.plan(2);

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

    m.equal(destination, unsubs, expected);
    m.has(source, subs);
}));

tape("should support string-based assertions with unsubscriptions", marbles((m, t) => {

    t.plan(2);

    const source =  m.hot("--^-a-b-c-|");
    const subs =            "^----!";
    const unsubs =          "-----!";
    const expected =        "--a-b-";

    const destination = source;

    m.equal(destination, unsubs, expected);
    m.has(source, subs);
}));

tape("should support string-based assertions with unsubscriptions and values", marbles((m, t) => {

    t.plan(2);

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

    m.equal(destination, unsubs, expected, values);
    m.has(source, subs);
}));

cases("should support cases", (m, c, t) => {

    t.plan(1);

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
