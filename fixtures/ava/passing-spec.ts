/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import test from "ava";
import { asapScheduler, of, timer } from "rxjs";
import { delay, map } from "rxjs/operators";
import * as sinon from "sinon";
import { cases, fakeSchedulers, marbles } from "../../dist/ava";

test("it should support marble tests", marbles((m, t) => {

    t.plan(2);

    const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
    };

    const source = m.hot("  --^-a-b-c-|", values);
    const subs = "            ^-------!";
    const expected = m.cold(" --b-c-d-|", values);

    const destination = source.pipe(map((value) => value + 1));

    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
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

test("it should support a timer", fakeSchedulers(t => {
    t.plan(2);
    const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();
    let received: number | undefined;
    timer(100).subscribe(value => received = value);
    clock.tick(50);
    t.is(received, undefined);
    clock.tick(50);
    t.is(received, 0);
    clock.restore();
}));

test("it should support delay", fakeSchedulers(t => {
    t.plan(2);
    const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();
    let received: number | undefined;
    of(1).pipe(delay(100)).subscribe(value => received = value);
    clock.tick(50);
    t.is(received, undefined);
    clock.tick(50);
    t.is(received, 1);
    clock.restore();
}));

test("it should support the asapScheduler", fakeSchedulers(t => {
    t.plan(2);
    const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();
    let received: number | undefined;
    of(1).pipe(delay(0, asapScheduler)).subscribe(value => received = value);
    t.is(received, undefined);
    clock.tick(0);
    t.is(received, 1);
    clock.restore();
}));
