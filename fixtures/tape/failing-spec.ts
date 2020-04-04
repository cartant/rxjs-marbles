/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { map } from "rxjs/operators";
import * as tape from "tape";
import { marbles } from "../../dist/tape";

if (process.env.FAILING !== "0") {
  tape(
    "it should fail",
    marbles((m, t) => {
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

      t.plan(1);
      m.expect(destination).toBeObservable(expected);
    })
  );
}
