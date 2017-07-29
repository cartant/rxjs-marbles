`rxjs-marbles` is an RxJS [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md) library that should be compatible with any test framework. It wraps the RxJS [`TestScheduler`](https://github.com/ReactiveX/rxjs/blob/5.4.2/src/testing/TestScheduler.ts) and provides methods similar to the [basic methods](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md#basic-methods) used in RxJS's marble tests.

It can be used with [AVA](https://github.com/avajs/ava), [Jasmine](https://github.com/jasmine/jasmine), [Jest](https://facebook.github.io/jest/), [Mocha](https://github.com/mochajs/mocha) or [Tape](https://github.com/substack/tape) in the browser or in Node and it supports CommonJS and ES module bundlers.

### With Jasmine and Mocha

Instead of passing your test function directly to `it`, pass it to the library's `marbles` function, like this:

```ts
import { marbles } from "rxjs-marbles";

describe("rxjs-marbles", () => {

    it("should support marble tests", marbles((m) => {

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
});
```

### With Jest

As with Jasmine and Mocha, instead of passing your test function directly to Jest, pass it to the library's `marbles` function:

```ts
import { marbles } from "rxjs-marbles";

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

    const destination = source.map((value) => value + 1);
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));
```

### With AVA

As with Jasmine and Mocha, instead of passing your test function directly to AVA, pass it to the library's `marbles` function. The `marbles` function will concatenate the additional `TestContext` argument it receives from AVA.

There is an `/ava` directory in the package that includes a wrapper that will correctly type additional argument and will call `configure` - passing AVA's assertion methods to ensure marble assertions will be counted towards AVA's `plan` - so be sure to specify `rxjs-marbles/ava` in the `import` statement or `require` call:

```ts
import { test } from "ava";
import { marbles } from "rxjs-marbles/ava";

test("it should support marble tests", marbles((m, t) => {

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

```

### With Tape

As with Jasmine and Mocha, instead of passing your test function directly to Tape, pass it to the library's `marbles` function. The `marbles` function will concatenate the additional `Test` argument it receives from Tape.

There is a `/tape` directory in the package that includes a wrapper that will correctly type additional argument and will call `configure` - passing Tape's assertion methods to ensure marble assertions will be counted towards Tape's `plan` - so be sure to specify `rxjs-marbles/tape` in the `import` statement or `require` call:

```ts
import * as tape from "tape";
import { marbles } from "rxjs-marbles/tape";

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
```

### Alternate assertion methods

If the BDD syntax is something you really don't like, there are some alternative methods on the `Context` that are more terse:

```ts
const source =  m.hot("--^-a-b-c-|", values);
const subs =            "^-------!";
const expected = m.cold("--b-c-d-|", values);

const destination = source.map((value) => value + 1);
m.equal(destination, expected);
m.has(source, subs);
```

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-103034213-2', 'auto');
    ga('send', 'pageview');
</script>
