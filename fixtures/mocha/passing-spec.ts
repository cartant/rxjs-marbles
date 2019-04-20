/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:no-unused-expression object-literal-sort-keys*/

import { expect } from "chai";
import { asapScheduler, of, timer } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import * as sinon from "sinon";
import { configure, DoneFunction, fakeSchedulers, observe } from "../../dist/mocha";

describe("marbles", () => {

    describe("deprecated", () => {

        const { cases, marbles } = configure({ run: false });

        it("should support marble tests without values", marbles((m) => {

            const source = m.hot("  --^-a-b-c-|".trim());
            const subs = "            ^-------!".trim();
            const expected = m.cold(" --a-b-c-|".trim());

            const destination = source;

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support marble tests with values", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot("  --^-a-b-c-|".trim(), values);
            const subs = "            ^-------!".trim();
            const expected = m.cold(" --b-c-d-|".trim(), values);

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support a done callback", marbles<DoneFunction>((m, done) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot("  --^-a-b-c-|".trim(), values);
            const subs = "            ^-------!".trim();
            const expected = m.cold(" --b-c-d-|".trim(), values);

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
            m.flush();

            setTimeout(done, 0);
        }));

        it("should support marble tests with class-instance values", marbles((m) => {

            class Thing {
                constructor(public value: number) {}
            }

            const values = {
                a: new Thing(1),
                b: new Thing(2),
                c: new Thing(3),
                d: new Thing(4)
            };

            const source = m.hot("  --^-a-b-c-|".trim(), values);
            const subs = "            ^-------!".trim();
            const expected = m.cold(" --b-c-d-|".trim(), values);

            const destination = source.pipe(map((thing) => new Thing(thing.value + 1)));

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support marble tests with errors", marbles((m) => {

            const source = m.hot("  --^-a-b-c-#".trim());
            const subs = "            ^-------!".trim();
            const expected = m.cold(" --a-b-c-#".trim());

            const destination = source;

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support marble tests with explicit errors", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot("  --^-a-b-c-#".trim(), values, new Error("Boom!"));
            const subs = "            ^-------!".trim();
            const expected = m.cold(" --b-c-d-#".trim(), values, new Error("Boom!"));

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support string-based assertions", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot(" --^-a-b-c-|".trim(), values);
            const subs = "           ^-------!".trim();
            const expected = "       --b-c-d-|".trim();

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination).toBeObservable(expected, values);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support unsubscriptions", marbles((m) => {

            const source = m.hot("  --^-a-b-c-|".trim());
            const subs = "            ^----!".trim();
            const unsubs = "          -----!".trim();
            const expected = m.cold(" --a-b-".trim());

            const destination = source;

            m.expect(destination, unsubs).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support unsubscriptions with values", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot("  --^-a-b-c-|".trim(), values);
            const subs = "            ^----!".trim();
            const unsubs = "          -----!".trim();
            const expected = m.cold(" --b-c-".trim(), values);

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination, unsubs).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support string-based assertions with unsubscriptions", marbles((m) => {

            const source = m.hot(" --^-a-b-c-|".trim());
            const subs = "           ^----!".trim();
            const unsubs = "         -----!".trim();
            const expected = "       --a-b-".trim();

            const destination = source;

            m.expect(destination, unsubs).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support string-based assertions with unsubscriptions and values", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot(" --^-a-b-c-|".trim(), values);
            const subs = "           ^----!".trim();
            const unsubs = "         -----!".trim();
            const expected = "       --b-c-".trim();

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination, unsubs).toBeObservable(expected, values);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support binding non-test schedulers", marbles((m) => {

            m.bind();

            const source = m.hot(" --^-a-b-c-|".trim());
            const subs = "           ^-------!".trim();
            const expected = "       ---a-b-c-|".trim();

            const destination = source.pipe(delay(m.time("-|")));

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        cases("should support cases", (m, c) => {

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

        it("should support promises", marbles((m) => {

            return Promise.resolve("pass").then((value) => expect(value).to.equal("pass"));
        }));

        it("should support reframing", marbles((m) => {

            m.reframe(100, 10000);

            const duration = m.time("--|");
            expect(duration).to.equal(200);

            const source = m.cold("   --(a|)".trim());
            const expected = m.cold(" ----(a|)".trim());
            m.expect(source.pipe(delay(duration, m.scheduler))).toBeObservable(expected);
        }));

        it("should restore after reframing", marbles((m) => {

            const duration = m.time("--|");
            expect(duration).to.equal(20);

            const source = m.cold("   --(a|)".trim());
            const expected = m.cold(" ----(a|)".trim());
            m.expect(source.pipe(delay(duration, m.scheduler))).toBeObservable(expected);
        }));
    });

    describe("run", () => {

        const { cases, marbles } = configure({});

        it("should support marble tests without values", marbles((m) => {

            const source = m.hot("  --^-a-b-c-|");
            const subs = "            ^-------!";
            const expected = m.cold(" --a-b-c-|");

            const destination = source;

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support marble tests with values", marbles((m) => {

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

        it("should support a done callback", marbles<DoneFunction>((m, done) => {

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
            m.flush();

            setTimeout(done, 0);
        }));

        it("should support marble tests with class-instance values", marbles((m) => {

            class Thing {
                constructor(public value: number) {}
            }

            const values = {
                a: new Thing(1),
                b: new Thing(2),
                c: new Thing(3),
                d: new Thing(4)
            };

            const source = m.hot("  --^-a-b-c-|", values);
            const subs = "            ^-------!";
            const expected = m.cold(" --b-c-d-|", values);

            const destination = source.pipe(map((thing) => new Thing(thing.value + 1)));

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support marble tests with errors", marbles((m) => {

            const source = m.hot("  --^-a-b-c-#");
            const subs = "            ^-------!";
            const expected = m.cold(" --a-b-c-#");

            const destination = source;

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support marble tests with explicit errors", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot("  --^-a-b-c-#", values, new Error("Boom!"));
            const subs = "            ^-------!";
            const expected = m.cold(" --b-c-d-#", values, new Error("Boom!"));

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support string-based assertions", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot(" --^-a-b-c-|", values);
            const subs = "           ^-------!";
            const expected = "       --b-c-d-|";

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination).toBeObservable(expected, values);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support unsubscriptions", marbles((m) => {

            const source = m.hot("  --^-a-b-c-|");
            const subs = "            ^----!";
            const unsubs = "          -----!";
            const expected = m.cold(" --a-b-");

            const destination = source;

            m.expect(destination, unsubs).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support unsubscriptions with values", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot("  --^-a-b-c-|", values);
            const subs = "            ^----!";
            const unsubs = "          -----!";
            const expected = m.cold(" --b-c-", values);

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination, unsubs).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support string-based assertions with unsubscriptions", marbles((m) => {

            const source = m.hot(" --^-a-b-c-|");
            const subs = "           ^----!";
            const unsubs = "         -----!";
            const expected = "       --a-b-";

            const destination = source;

            m.expect(destination, unsubs).toBeObservable(expected);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should support string-based assertions with unsubscriptions and values", marbles((m) => {

            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };

            const source = m.hot(" --^-a-b-c-|", values);
            const subs = "           ^----!";
            const unsubs = "         -----!";
            const expected = "       --b-c-";

            const destination = source.pipe(map((value) => value + 1));

            m.expect(destination, unsubs).toBeObservable(expected, values);
            m.expect(source).toHaveSubscriptions(subs);
        }));

        it("should not support binding", marbles((m) => {

            expect(() => m.bind()).to.throw(/not supported/);
        }));

        cases("should support cases", (m, c) => {

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

        it("should support promises", marbles((m) => {

            return Promise.resolve().then(() => expect(m).to.be.an("object"));
        }));

        it("should not support reframing", marbles((m) => {

            expect(() => m.reframe(100, 10000)).to.throw(/not supported/);
        }));

        it("should restore after reframing", marbles((m) => {

            const duration = m.time("--|");
            expect(duration).to.equal(2);

            const source = m.cold("   --(a|)");
            const expected = m.cold(" ----(a|)");
            m.expect(source.pipe(delay(duration, m.scheduler))).toBeObservable(expected);
        }));

        it("should support explicit durations in time", marbles((m) => {

            const duration = m.time(" 2ms |");
            expect(duration).to.equal(2);
        }));
    });
});

describe("observe", () => {

    it("should support observe", observe(() => of("pass").pipe(
        tap(value => expect(value).to.equal("pass"))
    )));
});

describe("fakeSchedulers", () => {

    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    it("should support a timer", fakeSchedulers(() => {
        let received: number | undefined;
        timer(100).subscribe(value => received = value);
        clock.tick(50);
        expect(received).to.be.undefined;
        clock.tick(50);
        expect(received).to.equal(0);
    }));

    it("should support delay", fakeSchedulers(() => {
        let received: number | undefined;
        of(1).pipe(delay(100)).subscribe(value => received = value);
        clock.tick(50);
        expect(received).to.be.undefined;
        clock.tick(50);
        expect(received).to.equal(1);
    }));

    it("should support the asapScheduler", fakeSchedulers(() => {
        let received: number | undefined;
        of(1).pipe(delay(0, asapScheduler)).subscribe(value => received = value);
        expect(received).to.be.undefined;
        clock.tick(0);
        expect(received).to.equal(1);
    }));

    afterEach(() => {
        clock.restore();
    });
});
