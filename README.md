# rxjs-marbles

[![NPM version](https://img.shields.io/npm/v/rxjs-marbles.svg)](https://www.npmjs.com/package/rxjs-marbles)
[![Build status](https://img.shields.io/travis/cartant/rxjs-marbles.svg)](http://travis-ci.org/cartant/rxjs-marbles)
[![dependency status](https://img.shields.io/david/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles)
[![devDependency Status](https://img.shields.io/david/dev/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles#info=peerDependencies)

### What is it?

`rxjs-marbles` is an RxJS [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md) library that should be compatible with any test framework. It wraps the RxJS [`TestScheduler`](https://github.com/ReactiveX/rxjs/blob/5.4.2/src/testing/TestScheduler.ts) and provides methods similar to the [basic methods](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md#basic-methods) used in RxJS's marble tests.

It can be used with [Jasmine](https://github.com/jasmine/jasmine), [Mocha](https://github.com/mochajs/mocha) or [Tape](https://github.com/substack/tape) in the browser or in Node and it supports CommonJS and ES module bundlers.

### Why might you need it?

I created this package because I wanted to use RxJS marble tests in a number of projects and those projects used different test frameworks.

There are a number of marble testing packages available - including the Mocha-based implementation in RxJS itself - but I wanted something that was simple, didn't involve messing with globals and `beforeEach`/`afterEach` functions and was consistent across test frameworks.

If you are looking for something similar, this might suit.

## Install

Install the package using NPM:

```
npm install rxjs-marbles --save-dev
```

And import the functions for use with TypeScript or ES2015:

```js
import { marbles } from "rxjs-marbles";
```

Or `require` the module for use with Node or a CommonJS bundler:

```js
const { marbles } = require("rxjs-marbles");
```

## API

The `rxjs-marbles` API is comprised of two functions:

* [configure](#configure)
* [marbles](#marbles)

<a name="configure"></a>

### configure

```ts
interface Configuration {
    assert?: (value: any, message: string) => void;
    assertDeepEqual?: (a: any, b: any) => void;
}

function configure(options: Configuration): void;
```

The `configure` method can be used to specify the assertion functions that are to be used. Calling it is optional; it's only necessary if particular assertion functions are to be used.

The default implementations simply perform the assertion and throw an error for failed assertions.

<a name="marbles"></a>

### marbles

```ts
function marbles(test: (context: Context) => any): () => any;
function marbles<T1>(test: (context: Context, t1: T1) => any): (t1: T1) => any;
function marbles<T1, T2>(test: (context: Context, t1: T1, t2: T2) => any): (t1: T1, t2: T2) => any;
function marbles<T1, T2, T3>(test: (context: Context, t1: T1, t2: T2, t3: T3) => any): (t1: T1, t2: T2, t3: T3) => any;
```

`marbles` is passed the test function, which it wraps, passing the wrapper to the test framework. When the test function is called, it is passed the `Context` - which contains methods that correspond to the [basic methods](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md#basic-methods) described in the RxJS documentation:

```ts
interface Context {
    cold<T = any>(marbles: string, values?: any, error?: any): ColdObservable<T>;
    configure(options: Configuration): void;
    equal<T = any>(actual: Observable<T>, expected: Observable<T>): void;
    expect<T = any>(actual: Observable<T>): Expect<T>;
    flush(): void;
    has<T = any>(actual: Observable<T>, expected: string | string[]): void;
    hot<T = any>(marbles: string, values?: any, error?: any): HotObservable<T>;
    readonly scheduler: TestScheduler;
    time(marbles: string): number;
}

interface Expect<T> {
    toBeObservable(expected: ColdObservable<T> | HotObservable<T>): void;
    toHaveSubscriptions(expected: string | string[]): void;
}
```

## Usage with Jasmine and Mocha

Instead of passing your test function directly to `it`, pass it to the library's `marbles` function, like this:

```ts
import { marbles } from "rxjs-marbles";

it("should map the values", marbles((m) => {

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

## Usage with Tape

As with Jasmine and Mocha, instead of passing your test function directly to Tape, pass it to the library's `marbles` function. The `marbles` function will concatenate the additional `Test` argument it receives from Tape.

There is a `/tape` directory in the package that includes a wrapper that will correctly type additional argument and will call `configure` - passing Tape's assertion methods to ensure marble assertions will be counted towards Tape's `plan` - so be sure to specify `rxjs-marbles/tape` in the `import` statement or `require` call:

```ts
import * as tape from "tape";
import { marbles } from "rxjs-marbles/tape";

tape("it should map the values", marbles((m, t) => {

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

If the BDD syntax is something you really don't like, there are some alternative methods on the `Context` that are more Tape-ish:

```ts
const destination = source.map((value) => value + 1);
m.equal(destination, expected);
m.has(source, subs);
```