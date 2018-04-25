import { marbles } from "rxjs-marbles/jasmine";
import { map } from "rxjs/operators";

describe("basic", () => {

    it("should support marble tests without values", marbles(m => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^-------!";
        const expected = m.cold("--b-c-d-|");

        const destination = source.pipe(
            map(value => String.fromCharCode(value.charCodeAt(0) + 1))
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with values", marbles(m => {

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

        const source =  m.hot("--^-a-b-c-|", inputs);
        const subs =            "^-------!";
        const expected = m.cold("--x-y-z-|", outputs);

        const destination = source.pipe(
            map((value) => value + 1)
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with errors", marbles(m => {

        const source =  m.hot("--^-a-b-c-#");
        const subs =            "^-------!";
        const expected = m.cold("--a-b-c-#");

        const destination = source;
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with explicit errors", marbles(m => {

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

        const source =  m.hot("--^-a-b-c-#", inputs, new Error("Boom!"));
        const subs =            "^-------!";
        const expected = m.cold("--x-y-z-#", outputs, new Error("Boom!"));

        const destination = source.pipe(
            map((value) => value + 1)
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});
