/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { asapScheduler, asyncScheduler } from "rxjs";

export function fakeSchedulers(
  fakeTest: () => any,
  nowImpl?: () => number
): () => any;
export function fakeSchedulers<T>(
  fakeTest: (t: T) => any,
  nowImpl?: () => number
): (t: T) => any;
export function fakeSchedulers(
  fakeTest: (...args: any[]) => any,
  nowImpl?: () => number
): (...args: any[]) => any {
  return (...args: any[]) => {
    const origSchedule = asapScheduler.schedule;
    const origNow = asyncScheduler.now;
    try {
      asapScheduler.schedule = asyncScheduler.schedule.bind(asyncScheduler);
      asyncScheduler.now = nowImpl || (() => Date.now());

      return fakeTest(...args);
    } finally {
      asapScheduler.schedule = origSchedule;
      asyncScheduler.now = origNow;
    }
  };
}
