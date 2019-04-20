import { marbles } from "rxjs-marbles/tape";
import { map } from "rxjs/operators";
import * as test from "tape";

test("should support marble tests without values", marbles((m, t) => {

    t.plan(2);

    const source = m.hot("  --^-a-b-c-|");
    const subs = "            ^-------!";
    const expected = m.cold(" --b-c-d-|");

    const destination = source.pipe(
        map(value => String.fromCharCode(value.charCodeAt(0) + 1))
    );
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));

test("should support marble tests with values", marbles((m, t) => {

    t.plan(2);

    const inputs = {
        a: 1,
        b: 2,
        c: 3
    };
    const outputs = {
        x: 2,
        y: 3,
        z: 4
    };

    const source = m.hot("  --^-a-b-c-|", inputs);
    const subs = "            ^-------!";
    const expected = m.cold(" --x-y-z-|", outputs);

    const destination = source.pipe(
        map((value) => value + 1)
    );
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));

test("should support marble tests with errors", marbles((m, t) => {

    t.plan(2);

    const source = m.hot("  --^-a-b-c-#");
    const subs = "            ^-------!";
    const expected = m.cold(" --a-b-c-#");

    const destination = source;
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));

test("should support marble tests with explicit errors", marbles((m, t) => {

    t.plan(2);

    const inputs = {
        a: 1,
        b: 2,
        c: 3
    };
    const outputs = {
        x: 2,
        y: 3,
        z: 4
    };

    const source = m.hot("  --^-a-b-c-#", inputs, new Error("Boom!"));
    const subs = "            ^-------!";
    const expected = m.cold(" --x-y-z-#", outputs, new Error("Boom!"));

    const destination = source.pipe(
        map((value) => value + 1)
    );
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));
