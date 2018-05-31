/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import { of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { cases, DoneFunction, marbles, observe } from "../../dist/jest";

test("it should handle white space in marble diagrams correctly", marbles((m) => {

    const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
    };

    const source = m.cold("  --a-b-c-|", values);
    const expected = m.cold("--b-c-d-|", values);

    const destination = source.pipe(map((value) => value + 1));

    m.expect(destination).toBeObservable(expected);
}));

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

test("it should support a done callback", marbles<DoneFunction>((m, done) => {

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
    m.flush();

    expect(done).toBeInstanceOf(Function);
    expect(done.fail).toBeInstanceOf(Function);
    setTimeout(done, 0);
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

    return Promise.resolve("pass").then((value) => expect(value).toEqual("pass"));
}));

test("it should support observe", observe(() => of("pass").pipe(
    tap(value => expect(value).toEqual("pass"))
)));
