# rxjs-marbles

[![NPM version](https://img.shields.io/npm/v/rxjs-marbles.svg)](https://www.npmjs.com/package/rxjs-marbles)
[![Build status](https://img.shields.io/travis/cartant/rxjs-marbles.svg)](http://travis-ci.org/cartant/rxjs-marbles)
[![dependency status](https://img.shields.io/david/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles)
[![devDependency Status](https://img.shields.io/david/dev/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/rxjs-marbles.svg)](https://david-dm.org/cartant/rxjs-marbles#info=peerDependencies)

### What is it?

`rxjs-marbles` is an RxJS [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md) library for any test framework.

It can be used with [Jasmine](https://github.com/jasmine/jasmine), [Mocha](https://github.com/mochajs/mocha) or [Tape](https://github.com/substack/tape) in the browser or in Node and it supports CommonJS and ES module bundlers.

### Why might I need it?

I created this package because I wanted to use RxJS marble tests in a number of projects and those projects used different test frameworks.

There are a number of marble testing packages available - including the Mocha-based implementation in RxJS itself; although, much of that implementation is not part of the RxJS distribution - but I wanted something that was simple, didn't involve messing with globals and `beforeEach`/`afterEach` functions and was consistent across test frameworks.

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

The `rxjs-marbles` API is comprised to two functions:

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

If using Tape and its `plan` method, it's necessary to configure appropriate functions so that Tape's assertion count is updated.

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

The `marbles` function is generic and the `Test` type can be specified so that its type information is used, like this:

```ts
import * as tape from "tape";
import { marbles } from "rxjs-marbles";

tape("it should map the values", marbles<tape.Test>((m, t) => {

    m.configure({
        assert: t.ok.bind(t),
        assertDeepEqual: t.deepEqual.bind(t)
    });
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

Note that if Tape's `plan` method is used, `configure` must be called so that Tape is informed of the assertions performed. Each call to `toBeObservable` or `toHaveSubscriptions` counts towards the number of expected assertions passed to `plan`.

The `configure` call and the generic type leads to some boilerplate that can be extracted to a reusable function:

```ts
import * as tape from "tape";
import { marbles } from "rxjs-marbles";

function tapeMarbles(func: (m: Context, t: tape.Test) => void): any {

    return marbles<tape.Test>((m, t) => {
        m.configure({
            assert: t.ok.bind(t),
            assertDeepEqual: t.deepEqual.bind(t)
        });
        func(m, t);
    });
}

tape("it should map the values", tapeMarbles((m, t) => {

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

Also, if the BDD syntax is something you really don't like, there are some alternative methods on the `Context` that are more Tape-ish:

```ts
const destination = source.map((value) => value + 1);
m.equal(destination, expected);
m.has(source, subs);
```