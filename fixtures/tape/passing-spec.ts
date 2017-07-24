/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import * as tape from "tape";
import { marbles } from "../../dist/tape";

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
