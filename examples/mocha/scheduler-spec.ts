import { marbles } from "rxjs-marbles/mocha";
import { asyncScheduler } from "rxjs";
import { delay } from "rxjs/operators";

describe("scheduler", () => {

    it("should expose the TestScheduler", marbles(m => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^---------!";
        const expected =        "----a-b-c-|";

        const destination = source.pipe(delay(m.time("--|"), m.scheduler));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support binding specific schedulers", marbles(m => {

        m.bind(asyncScheduler);

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^---------!";
        const expected =        "----a-b-c-|";

        const destination = source.pipe(delay(m.time("--|"), asyncScheduler));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support binding all schedulers", marbles(m => {

        m.bind();

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^---------!";
        const expected =        "----a-b-c-|";

        const destination = source.pipe(delay(m.time("--|")));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});
