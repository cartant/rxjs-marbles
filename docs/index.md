`rxjs-marbles` is an RxJS [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md) library that should be compatible with any test framework. It wraps the RxJS [`TestScheduler`](https://github.com/ReactiveX/rxjs/blob/5.4.2/src/testing/TestScheduler.ts) and provides methods similar to the [basic methods](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md#basic-methods) used in RxJS's marble tests.

It can be used with [AVA](https://github.com/avajs/ava), [Jasmine](https://github.com/jasmine/jasmine), [Jest](https://facebook.github.io/jest/), [Mocha](https://github.com/mochajs/mocha) or [Tape](https://github.com/substack/tape) in the browser or in Node and it supports CommonJS and ES module bundlers.

### With Mocha

Instead of passing your test function directly to `it`, pass it to the library's `marbles` function, like this:

```ts
import { marbles } from "rxjs-marbles/mocha";
import { map } from "rxjs/operators";

describe("rxjs-marbles", () => {

    it("should support marble tests", marbles(m => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^-------!";
        const expected =        "--b-c-d-|";

        const destination = source.pipe(
            map(value => String.fromCharCode(value.charCodeAt(0) + 1))
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});
```

### With other test frameworks

To see how `rxjs-marbles` can be used with other test frameworks, see the [examples](https://github.com/cartant/rxjs-marbles/tree/master/examples) within the repository.

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-103034213-2', 'auto');
    ga('send', 'pageview');
</script>
