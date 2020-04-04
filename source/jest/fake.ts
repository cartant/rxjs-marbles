/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { fakeSchedulers as _fakeSchedulers } from "../fake";

declare const jest: any;

export function fakeSchedulers(
  fakeTest: (advance: (milliseconds: number) => void) => any
): () => any {
  let fakeTime = 0;
  return _fakeSchedulers(
    () =>
      fakeTest((milliseconds) => {
        fakeTime += milliseconds;
        jest.advanceTimersByTime(milliseconds);
      }),
    () => fakeTime
  );
}
