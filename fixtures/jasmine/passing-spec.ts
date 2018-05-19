/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import { of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { cases, marbles, observe } from "../../dist/jasmine";

interface TestContext {
    myVariable: number;
}

describe("marbles", () => {

    beforeEach(function(this: TestContext): void {
        this.myVariable = 57;
    });

    it("should preserve test context", marbles(function(this: TestContext, m: any): void {
        expect(this.myVariable).toBe(57);
    }));

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

        const destination = source.pipe(map((value) => value + 1));

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

    it("should pass callbacks to marbles", marbles(((m: any, callback: any) => {
        expect(typeof callback).toEqual("function");
        callback();
    }) as any));

    cases("should pass callbacks to cases", ((m: any, c: any, callback: any) => {
        expect(typeof callback).toEqual("function");
        callback();
    }) as any, {
        "unused": {}
    });
});

describe("observe", () => {

    it("should support observe", observe(() => of("pass").pipe(
        tap(value => expect(value).toEqual("pass"))
    )));
});
