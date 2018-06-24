/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { asapScheduler, asyncScheduler } from "rxjs";

export function fakeSchedulers<R>(fakeTest: () => R): () => R;
export function fakeSchedulers<T, R>(fakeTest: (t: T) => R): (t: T) => R;
export function fakeSchedulers<R>(fakeTest: (...args: any[]) => R): (...args: any[]) => R {
    return (...args: any[]) => {
        try {
            asapScheduler.schedule = asyncScheduler.schedule.bind(asyncScheduler);
            asyncScheduler.now = () => Date.now();
            return fakeTest(...args);
        } finally {
            delete asapScheduler.schedule;
            delete asyncScheduler.now;
        }
    };
}
