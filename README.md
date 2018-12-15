# rxjs-marbles

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cartant/rxjs-marbles/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/rxjs-marbles.svg)](https://www.npmjs.com/package/rxjs-marbles)
[![Downloads](http://img.shields.io/npm/dm/rxjs-marbles.svg)](https://npmjs.org/package/rxjs-marbles)
[![Build status](https://img.shields.io/travis/cartant/rxjs-marbles.svg)](http://travis-ci.org/cartant/rxjs-marbles)
[![dependency status](https://img.shields.io/david/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles)
[![devDependency Status](https://img.shields.io/david/dev/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles#info=peerDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/cartant/rxjs-marbles.svg)](https://greenkeeper.io/)

### What is it?

`rxjs-marbles` is an RxJS [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md) library that should be compatible with any test framework. It wraps the RxJS [`TestScheduler`](https://github.com/ReactiveX/rxjs/blob/5.4.2/src/testing/TestScheduler.ts) and provides methods similar to the [helper methods](https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md#api) used the `TestScheduler` API.

It can be used with [AVA](https://github.com/avajs/ava), [Jasmine](https://github.com/jasmine/jasmine), [Jest](https://facebook.github.io/jest/), [Mocha](https://github.com/mochajs/mocha) or [Tape](https://github.com/substack/tape) in the browser or in Node and it supports CommonJS and ES module bundlers.

### Why might you need it?

I created this package because I wanted to use RxJS marble tests in a number of projects and those projects used different test frameworks.

There are a number of marble testing packages available - including the Mocha-based implementation in RxJS itself - but I wanted something that was simple, didn't involve messing with globals and `beforeEach`/`afterEach` functions and was consistent across test frameworks.

If you are looking for something similar, this might suit.

## Install

Install the package using NPM:

```
npm install rxjs-marbles --save-dev
```

## Getting started

If you're just getting started with marble testing, you might be interested in how I wasted some of my time by not carefully reading the manual: [RxJS Marble Testing: RTFM](https://medium.com/@cartant/rxjs-marble-testing-rtfm-a9a6cd3db758).

## Usage

`rxjs-marbles` contains framework-specific import locations. If there is a location for the test framework that you are using, you should use the specific import. Doing so will ensure that you receive the best possible integration with your test framework.

For example, importing from `"rxjs-marbles/jest"` will ensure that Jest's matcher is used and the output for test failures will be much prettier.

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

To see how `rxjs-marbles` can be used with other test frameworks, see the [examples](./examples) within the repository.

With AVA and Tape, the callback passed to the `marbles` function will receive an addional argument - the AVA `ExecutionContext` or the Tape `Test` - which can be used to specify the number of assertions in the test plan. See the framework-specific examples for details.

### Using cases for test variations

In addition to the `marbles` function, the library exports a `cases` function that can be used to reduce test boilerplate by specifying multiple cases for variations of a single test. The API is based on that of [`jest-in-case`](https://github.com/Thinkmill/jest-in-case), but also includes the marbles context.

The `cases` implementation is framework-specific, so the import must specify the framework. For example, with Mocha, you would import `cases` and use it instead of the `it` function, like this:

```ts
import { cases } from "rxjs-marbles/mocha";
import { map } from "rxjs/operators";

describe("rxjs-marbles", () => {

    cases("should support cases", (m, c) => {

        const source =  m.hot(c.s);
        const destination = source.pipe(
            map(value => String.fromCharCode(value.charCodeAt(0) + 1))
        );
        m.expect(destination).toBeObservable(c.e);

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
});
```

### `TestScheduler` behaviour changes in RxJS version 6

In RxJS version 6, a `run` method was added to the `TestScheduler` and when it's used, the scheduler's behaviour is significantly changed.

`rxjs-marbles` now defaults to using the scheduler's `run` method. To use the scheduler's old behaviour, you can call the `configure` function, passing `{ run: false }`, like this:

```ts
import { configure } from "rxjs-marbles/mocha";
const { cases, marbles } = configure({ run: false });
```

### Dealing with deeply-nested schedulers

**WARNING**: `bind` is deprecated and can only be used with `configure({ run: false })`.

Sometimes, passing the `TestScheduler` instance to the code under test can be tedious. The context includes a `bind` method that can be used to bind a scheduler's `now` and `schedule` methods to those of the context's `TestScheduler`.

`bind` can be passed specific scheduler instances or can be called with no arguments to bind RxJS's `animationFrame`, `asap`, `async` and `queue` schedulers to the context's `TestScheduler`.

For example:

```ts
it("should support binding non-test schedulers", marbles(m => {

    m.bind();

    const source =  m.hot("--^-a-b-c-|");
    const subs =            "^--------!";
    const expected =        "---a-b-c-|";

    // Note that delay is not passed a scheduler:
    const destination = source.delay(m.time("-|"));
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
}));
```

### Changing the time per frame

**WARNING**: `reframe` is deprecated and can only be used with `configure({ run: false })`.

The RxJS `TestScheduler` defaults to 10 virtual milliseconds per frame (each character in the diagram represents a frame) with a maximum of 750 virtual milliseconds for each test.

If the default is not suitable for your test, you can change it by calling the context's `reframe` method, specifying the time per frame and the (optional) maximum time. The `reframe` method must be called before any of the `cold`, `flush`, `hot` or `time` methods are called.

The [examples](./examples) include tests that use `reframe`.

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

## API

The `rxjs-marbles` API is comprised of two functions:

* [configure](#configure)
* [marbles](#marbles)
* [observe](#observe)
* [fakeSchedulers](#fakeSchedulers)

<a name="configure"></a>

### configure

```ts
interface Configuration {
    assert?: (value: any, message: string) => void;
    assertDeepEqual?: (a: any, b: any) => void;
    frameworkMatcher?: boolean;
    run?: boolean;
}

function configure(options: Configuration): { marbles: MarblesFunction };
```

The `configure` method can be used to specify the assertion functions that are to be used. Calling it is optional; it's only necessary if particular assertion functions are to be used. It returns an object containing a `marbles` function that will use the specified configuration.

The default implementations simply perform the assertion and throw an error for failed assertions.

<a name="marbles"></a>

### marbles

```ts
function marbles(test: (context: Context) => any): () => any;
function marbles<T>(test: (context: Context, t: T) => any): (t: T) => any;
```

`marbles` is passed the test function, which it wraps, passing the wrapper to the test framework. When the test function is called, it is passed the `Context` - which contains methods that correspond to the `TestScheduler` [helper methods](https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md#api):

```ts
interface Context {
    autoFlush: boolean;
    bind(...schedulers: IScheduler[]): void;
    cold<T = any>(marbles: string, values?: any, error?: any): ColdObservable<T>;
    configure(options: Configuration): void;
    equal<T = any>(actual: Observable<T>, expected: Observable<T>): void;
    equal<T = any>(actual: Observable<T>, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: Observable<T>): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: string, values?: { [key: string]: T }, error?: any): void;
    expect<T = any>(actual: Observable<T>, unsubscription?: string): Expect<T>;
    flush(): void;
    has<T = any>(actual: Observable<T>, expected: string | string[]): void;
    hot<T = any>(marbles: string, values?: any, error?: any): HotObservable<T>;
    reframe(timePerFrame: number, maxTime?: number): void;
    readonly scheduler: TestScheduler;
    teardown(): void;
    time(marbles: string): number;
}

interface Expect<T> {
    toBeObservable(expected: ColdObservable<T> | HotObservable<T>): void;
    toBeObservable(expected: string, values?: { [key: string]: T }, error?: any): void;
    toHaveSubscriptions(expected: string | string[]): void;
}
```

<a name="observe"></a>

### observe

In Jasmine, Jest and Mocha, the test framework recognises asynchronous tests by their taking a `done` callback or returning a promise.

The `observe` helper can be useful when an observable cannot be tested using a marble test. Instead, expectations can be added to the observable stream and the observable can be returned from the test.

See the [examples](./examples) for usage.

<a name="fakeSchedulers"></a>

### fakeSchedulers

With Jest and Jasmine, the test framework can be configured to use its own concept of fake time. AVA, Mocha and Tape don't have built-in support for fake time, but the functionality can be added via `sinon.useFakeTimers()`.

It's possible to test observables using the test framework's concept of fake time, but the `now` method of the `AsyncScheduler` has to be patched. The `fakeSchedulers` helper can be used to do this.

See the [examples](./examples) for usage.

Also, I've written an article on the `fakeSchedulers` function: [RxJS: Testing with Fake Time](https://medium.com/@cartant/rxjs-testing-with-fake-time-94114271eed2).