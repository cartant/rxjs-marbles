import test from "ava";
import { configure } from "rxjs-marbles/ava";
import { asyncScheduler } from "rxjs";
import { delay } from "rxjs/operators";

const { marbles } = configure({ run: false });

test("should expose the TestScheduler", marbles((m, t) => {

    t.plan(2);

    const source = m.hot(" --^-a-b-c-|");
    const subs = "           ^-------!";
    const expected = "       ----a-b-c-|";

    const destination = source.pipe(delay(m.time("--|"), m.scheduler));
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));

test("should support binding specific schedulers", marbles((m, t) => {

    t.plan(2);
    m.bind(asyncScheduler);

    const source = m.hot(" --^-a-b-c-|");
    const subs = "           ^-------!";
    const expected = "       ----a-b-c-|";

    const destination = source.pipe(delay(m.time("--|"), asyncScheduler));
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));

test("should support binding all schedulers", marbles((m, t) => {

    t.plan(2);
    m.bind();

    const source = m.hot(" --^-a-b-c-|");
    const subs = "           ^-------!";
    const expected = "       ----a-b-c-|";

    const destination = source.pipe(delay(m.time("--|")));
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));
