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