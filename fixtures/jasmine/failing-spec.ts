/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { of } from "rxjs";
import { finalize, map, tap } from "rxjs/operators";
import { marbles, observe } from "../../dist/jasmine";

if (process.env.FAILING !== "0") {
  describe("marbles", () => {
    it(
      "should fail",
      marbles((m) => {
        const values = {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        };

        const source = m.hot("  --^-a-b-c-|", values);
        const subs = "            ^-------!";
        const expected = m.cold(" --a-a-a-|", values);

        const destination = source.pipe(map((value) => value + 1));

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
      })
    );
  });

  describe("observe", () => {
    it(
      "should fail",
      observe(() =>
        of("fail").pipe(tap((value) => expect(value).not.toEqual("fail")))
      )
    );

    it(
      "should fail on assertions in finalize operator",
      observe(() => {
        const mock = jasmine.createSpy();
        return of("fail").pipe(
          tap(() => mock()),
          finalize(() => expect(mock).not.toHaveBeenCalled())
        );
      })
    );
  });
}
