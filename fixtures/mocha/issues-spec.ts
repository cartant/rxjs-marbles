/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import { expect } from "chai";
import { of, Subject } from "rxjs";
import { throttleTime } from "rxjs/operators";
import * as sinon from "sinon";
import { configure } from "../../dist/mocha";
import { fakeSchedulers } from "../../dist/mocha";

describe("issues", () => {
  describe("deprecated", () => {
    const { marbles } = configure({ run: false });

    describe("issue-22", () => {
      it(
        "should fail with a useful error message",
        marbles((m) => {
          expect(() => {
            const actual = of([undefined]);
            m.expect(actual).toBeObservable("--|");
            m.autoFlush = false;
            m.flush();
          }).to.throw(/"value":"\[\s*undefined\s*\]"/);
        })
      );
    });
  });

  describe("fakeSchedulers", () => {
    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    describe("issue-75", () => {
      it(
        "should support throttleTime",
        fakeSchedulers(() => {
          const values: number[] = [];
          const source = new Subject<number>();

          const throttled = source.pipe(throttleTime(10_000));
          throttled.subscribe((value) => values.push(value));

          source.next(1);
          clock.tick(4_000);
          source.next(2);
          clock.tick(4_000);
          source.next(3);
          clock.tick(4_000);
          source.next(4);
          clock.tick(4_000);

          expect(values).to.deep.equal([1, 4]);
        })
      );
    });

    afterEach(() => {
      clock.restore();
    });
  });
});
