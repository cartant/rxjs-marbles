/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import { expect } from "chai";
import { of } from "rxjs/observable/of";
import { cases, marbles } from "../../dist/mocha";

describe("issues", () => {

    describe("issue-22", () => {

        it("should fail with a useful error message", marbles(m => {
            expect(() => {
                const actual = of([undefined]);
                m.expect(actual).toBeObservable("--|");
                m.autoFlush = false;
                m.flush();
            }).to.throw(/\{"frame":0,"notification":\{"kind":"N","value":"\[\s*undefined\s*\]","hasValue":true\}\}/);
        }));
    });
});
