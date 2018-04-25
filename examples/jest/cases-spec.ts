/*tslint:disable:object-literal-sort-keys*/

import { cases, marbles } from "rxjs-marbles/jest";
import { map } from "rxjs/operators";

describe("cases", () => {

    cases("should support cases", (m, c) => {

        const source =  m.hot(c.s);
        const expected = m.cold(c.e);
        const destination = source.pipe(
            map(value => String.fromCharCode(value.charCodeAt(0) + 1))
        );

        m.expect(destination).toBeObservable(expected);
    }, {
        "empty": {
            s: "-|",
            e: "-|"
        },
        "non-empty": {
            s: "-a-b-c-|",
            e: "-b-c-d-|"
        }
    });
});
