/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { asapScheduler, asyncScheduler } from "rxjs";

export function fakeSchedulers(
  fakeTest: () => any,
  now?: () => number
): () => any;
export function fakeSchedulers<T>(
  fakeTest: (t: T) => any,
  now?: () => number
): (t: T) => any;
export function fakeSchedulers(
  fakeTest: (...args: any[]) => any,
  now?: () => number
): (...args: any[]) => any {
  return (...args: any[]) => {
    const hasOwnSchedule = asapScheduler.hasOwnProperty("schedule");
    if (hasOwnSchedule) {
      /*tslint:disable-next-line:no-console*/
      console.warn(
        "asapScheduler.schedule appears to have been patched outside of fakeSchedulers."
      );
    }
    const origSchedule = asapScheduler.schedule;
    const origNow = asyncScheduler.now;
    try {
      asapScheduler.schedule = asyncScheduler.schedule.bind(asyncScheduler);
      asyncScheduler.now = now || (() => Date.now());
      return fakeTest(...args);
    } finally {
      if (hasOwnSchedule) {
        asapScheduler.schedule = origSchedule;
      } else {
        delete asapScheduler.schedule;
      }
      asyncScheduler.now = origNow;
    }
  };
}
