/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { asapScheduler, asyncScheduler } from "rxjs";

export function fakeSchedulers(fakeTest: () => any): () => any;
export function fakeSchedulers<T>(fakeTest: (t: T) => any): (t: T) => any;
export function fakeSchedulers(
  fakeTest: (...args: any[]) => any
): (...args: any[]) => any {
  return (...args: any[]) => {
    try {
      asapScheduler.schedule = asyncScheduler.schedule.bind(
        asyncScheduler
      ) as any;
      asyncScheduler.now = () => Date.now();
      return fakeTest(...args);
    } finally {
      delete asapScheduler.schedule;
      delete asyncScheduler.now;
    }
  };
}
