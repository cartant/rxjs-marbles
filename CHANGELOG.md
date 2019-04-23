<a name="5.0.2"></a>
## [5.0.2](https://github.com/cartant/rxjs-marbles/compare/v5.0.1...v5.0.2) (2019-04-23)

### Fixes

* Call `circularDeepEqual` instead of `deepEqual` so that higher-order observables are asserted correctly. ([cdb43eb](https://github.com/cartant/rxjs-marbles/commit/cdb43eb))

<a name="5.0.1"></a>
## [5.0.1](https://github.com/cartant/rxjs-marbles/compare/v5.0.0...v5.0.1) (2019-04-01)

### Non-breaking changes

* Changed a parameter name from `unsubscription` to `subscription` better reflect that subscription can now be used, too. See [this RxJS PR](https://github.com/ReactiveX/rxjs/pull/3997). ([ac61708](https://github.com/cartant/rxjs-marbles/commit/ac61708))

<a name="5.0.0"></a>
## [5.0.0](https://github.com/cartant/rxjs-marbles/compare/v4.3.5...v5.0.0) (2018-12-16)

### Breaking changes

* Upgrade to AVA 1.0. In that version, breaking changes were made to AVA's exports. The major version bump for `rxjs-marbles` reflects this; there are no changes to `rxjs-marbles` functionality in this release. ([2dab29b](https://github.com/cartant/rxjs-marbles/commit/2dab29b))

<a name="4.3.5"></a>
## [4.3.5](https://github.com/cartant/rxjs-marbles/compare/v4.3.4...v4.3.5) (2018-11-12)

### Bug fixes

* Check for Jasmine's `withContext` at runtime. ([24a0715](https://github.com/cartant/rxjs-marbles/commit/24a0715))

<a name="4.3.4"></a>
## [4.3.4](https://github.com/cartant/rxjs-marbles/compare/v4.3.3...v4.3.4) (2018-11-11)

### Bug fixes

* Overwrite the Jasmine and Jest assert options. ([24a0715](https://github.com/cartant/rxjs-marbles/commit/24a0715))

<a name="4.3.3"></a>
## [4.3.3](https://github.com/cartant/rxjs-marbles/compare/v4.3.2...v4.3.3) (2018-11-11)

### Bug fixes

* Use Jasmine assertions for the `rxjs-marbles/jasmine` import location. ([36771ca](https://github.com/cartant/rxjs-marbles/commit/36771ca))

<a name="4.3.2"></a>
## [4.3.2](https://github.com/cartant/rxjs-marbles/compare/v4.3.1...v4.3.2) (2018-11-02)

### Build

* Replace `lodash` with `fast-equals` to avoid `require` calls in the ES module distributions. ([5909ebc](https://github.com/cartant/rxjs-marbles/commit/5909ebc))

<a name="4.3.1"></a>
## [4.3.1](https://github.com/cartant/rxjs-marbles/compare/v4.3.0...v4.3.1) (2018-07-30)

### Build

* Update `lodash` to avoid security warning from [David](https://david-dm.org/cartant/rxjs-marbles).

<a name="4.3.0"></a>
## [4.3.0](https://github.com/cartant/rxjs-marbles/compare/v4.2.1...v4.3.0) (2018-06-24)

### Features

* Add `fakeSchedulers` helpers for all frameworks. ([54b86de](https://github.com/cartant/rxjs-marbles/commit/54b86de))

<a name="4.2.1"></a>
## [4.2.1](https://github.com/cartant/rxjs-marbles/compare/v4.2.0...v4.2.1) (2018-06-10)

### Bug fixes

* Support the `asapScheduler` in `fakeSchedulers`. ([e510698](https://github.com/cartant/rxjs-marbles/commit/e510698))

<a name="4.2.0"></a>
## [4.2.0](https://github.com/cartant/rxjs-marbles/compare/v4.1.0...v4.2.0) (2018-06-09)

### Features

* Add a `fakeSchedulers` helper for non-marble tests in Jasmine (with Angular) and Jest. ([01cfbb3](https://github.com/cartant/rxjs-marbles/commit/01cfbb3))

<a name="4.1.0"></a>
## [4.1.0](https://github.com/cartant/rxjs-marbles/compare/v4.0.2...v4.1.0) (2018-05-19)

### Features

* Add an `observe` helper for non-marble tests in Jasmine, Jest and Mocha. ([9c38cce](https://github.com/cartant/rxjs-marbles/commit/9c38cce))

<a name="4.0.2"></a>
## [4.0.2](https://github.com/cartant/rxjs-marbles/compare/v4.0.1...v4.0.2) (2018-05-18)

### Bug fixes

* Fix an error message. ([55b8a92](https://github.com/cartant/rxjs-marbles/commit/55b8a92))

<a name="4.0.1"></a>
## [4.0.1](https://github.com/cartant/rxjs-marbles/compare/v4.0.0...v4.0.1) (2018-05-18)

### Bug fixes

* Support explicit durations in the context's `time` method. ([4a7ac1d](https://github.com/cartant/rxjs-marbles/commit/4a7ac1d))

<a name="4.0.0"></a>
## [4.0.0](https://github.com/cartant/rxjs-marbles/compare/v3.0.1...v4.0.0) (2018-05-17)

### Breaking changes

* Default to using `TestScheduler.run`. See the [RxJS documentation](https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md) for an explanation of the new behaviour and of the breaking changes.
* Added a `run` property to the configuration settings - it defaults to `true`.
* The `configure` function now returns an object containing a `marbles` function (and a `cases` function, for the framework-specific imports) that has the specified configuration applied. For example, to continue using the now deprecated behaviour, you would make these changes:

    ```diff
    - import { cases, marbles } from "rxjs-marbles/mocha";
    + import { configure } from "rxjs-marbles/mocha";
    + const { cases, marbles } = configure({ run: false });
    ```

* The following context methods and properties can only be used with `configure({ run: false })`:
    * `autoFlush`
    * `bind`
    * `configure`
    * `reframe`
    * `teardown`

<a name="3.0.1"></a>
## [3.0.1](https://github.com/cartant/rxjs-marbles/compare/v3.0.0...v3.0.1) (2018-04-26)

### Bug fixes

* Preserve the `this` context in the `marbles` callback. ([be32253](https://github.com/cartant/rxjs-marbles/commit/be32253))

<a name="3.0.0"></a>
## [3.0.0](https://github.com/cartant/rxjs-marbles/compare/v2.4.1...v3.0.0) (2018-04-25)

### Breaking changes

* Upgrade to RxJS version 6.
* Rename the UMD global to `rxjsMarbles`.

<a name="2.4.1"></a>
## [2.4.1](https://github.com/cartant/rxjs-marbles/compare/v2.4.0...v2.4.1) (2018-04-11)

### Bug fixes

* **reframe**: Fix import case. ([651fe31](https://github.com/cartant/rxjs-marbles/commit/651fe31))

<a name="2.4.0"></a>
## [2.4.0](https://github.com/cartant/rxjs-marbles/compare/v2.3.3...v2.4.0) (2018-04-11)

### Features

* **reframe**: Add `reframe` to the `Context` to allow amount of virtual time per frame/character to be specified. ([15ef0e9](https://github.com/cartant/rxjs-marbles/commit/15ef0e9))

<a name="2.3.3"></a>
## [2.3.3](https://github.com/cartant/rxjs-marbles/compare/v2.3.2...v2.3.3) (2018-03-29)

### Bug fixes

* **bind**: Ensure teardown always happens for each `bind`. ([19caa51](https://github.com/cartant/rxjs-marbles/commit/19caa51))

<a name="2.3.2"></a>
## [2.3.2](https://github.com/cartant/rxjs-marbles/compare/v2.3.1...v2.3.2) (2018-03-05)

### Bug fixes

* **marbles**: Return whatever the supplied `func` returns. ([dde5031](https://github.com/cartant/rxjs-marbles/commit/dde5031))

<a name="2.3.1"></a>
## [2.3.1](https://github.com/cartant/rxjs-marbles/compare/v2.3.0...v2.3.1) (2018-02-15)

### Bug fixes

* **matcher**: Support `undefined` values in `stringify`. ([f156dab](https://github.com/cartant/rxjs-marbles/commit/f156dab))

<a name="2.3.0"></a>
## [2.3.0](https://github.com/cartant/rxjs-marbles/compare/v2.2.0...v2.3.0) (2017-12-21)

### Features

* **Jest**: Use Jest's matcher for the marbles assertion. ([3721847](https://github.com/cartant/rxjs-marbles/commit/3721847))

<a name="2.2.0"></a>
## [2.2.0](https://github.com/cartant/rxjs-marbles/compare/v2.1.0...v2.2.0) (2017-11-30)

### Features

* **bind**: Add a `bind` method for binding non-test schedulers to the context's `TestScheduler`. ([3a7963c](https://github.com/cartant/rxjs-marbles/commit/3a7963c))

<a name="2.1.0"></a>
## [2.1.0](https://github.com/cartant/rxjs-marbles/compare/v2.0.0...v2.1.0) (2017-10-08)

### Features

* **cases**: Add support for a [`jest-in-case`](https://github.com/Thinkmill/jest-in-case)-style `cases` function. ([4d3559e](https://github.com/cartant/rxjs-marbles/commit/4d3559e))

<a name="2.0.0"></a>
## [2.0.0](https://github.com/cartant/rxjs-marbles/compare/v1.6.0...v2.0.0) (2017-09-11)

### Breaking changes

* **context**: Remove the unintended public `testScheduler` property (it was an alias for the public `scheduler` property).  ([83032e9](https://github.com/cartant/rxjs-marbles/commit/83032e9))

### Features

* **context**: Add support for preventing the automatic flushing of the test scheduler. ([5f9ff6a](https://github.com/cartant/rxjs-marbles/commit/5f9ff6a))

### Build

* Update dependencies.

<a name="1.6.0"></a>
## [1.6.0](https://github.com/cartant/rxjs-marbles/compare/v1.5.2...v1.6.0) (2017-08-08)

### Features

* **expect**: Add support for unsubscription strings. ([a9a839d](https://github.com/cartant/rxjs-marbles/commit/a9a839d))

<a name="1.5.2"></a>
## [1.5.2](https://github.com/cartant/rxjs-marbles/compare/v1.5.1...v1.5.2) (2017-07-29)

### Documentation

* Minor documentation changes.

<a name="1.5.1"></a>
## [1.5.1](https://github.com/cartant/rxjs-marbles/compare/v1.5.0...v1.5.1) (2017-07-24)

### Documentation

* Updated interfaces in README.

<a name="1.5.0"></a>
## [1.5.0](https://github.com/cartant/rxjs-marbles/compare/v1.4.0...v1.5.0) (2017-07-24)

### Features

* **string expectations**: Expectations can be passed as marble strings or hot/cold observables. ([99fc0df](https://github.com/cartant/rxjs-marbles/commit/99fc0df))

<a name="1.4.0"></a>
## [1.4.0](https://github.com/cartant/rxjs-marbles/compare/v1.3.2...v1.4.0) (2017-07-23)

### Features

* **AVA and Jest**: Add support for AVA and Jest. ([abcf069](https://github.com/cartant/rxjs-marbles/commit/abcf069))

<a name="1.3.2"></a>
## [1.3.2](https://github.com/cartant/rxjs-marbles/compare/v1.3.1...v1.3.2) (2017-07-23)

### Documentation

* Minor documentation changes.

<a name="1.3.1"></a>
## [1.3.1](https://github.com/cartant/rxjs-marbles/compare/v1.3.0...v1.3.1) (2017-07-22)

### Documentation

* Correct missing `plan` call in Tape example. ([7400890](https://github.com/cartant/rxjs-marbles/commit/7400890))

<a name="1.3.0"></a>
## [1.3.0](https://github.com/cartant/rxjs-marbles/compare/v1.2.0...v1.3.0) (2017-07-22)

### Feature

* **Tape**: Distribute Tape boilerplate in `rxjs-marbles/tape`. ([95580f3](https://github.com/cartant/rxjs-marbles/commit/95580f3))

<a name="1.2.0"></a>
## [1.2.0](https://github.com/cartant/rxjs-marbles/compare/v1.1.0...v1.2.0) (2017-07-22)

### Feature

* **context**: Assert test observable args and subscriptions. ([024cc16](https://github.com/cartant/rxjs-marbles/commit/024cc16))

<a name="1.1.0"></a>
## [1.1.0](https://github.com/cartant/rxjs-marbles/compare/v1.0.2...v1.1.0) (2017-07-21)

### Feature

* **context**: Expose the scheduler. ([8774ca1](https://github.com/cartant/rxjs-marbles/commit/8774ca1))

<a name="1.0.2"></a>
## [1.0.2](https://github.com/cartant/rxjs-marbles/compare/v1.0.1...v1.0.2) (2017-07-21)

### Documentation

* Trivial documentation changes.

<a name="1.0.1"></a>
## [1.0.1](https://github.com/cartant/rxjs-marbles/compare/v1.0.0...v1.0.1) (2017-07-20)

### Documentation

* Trivial documentation changes.