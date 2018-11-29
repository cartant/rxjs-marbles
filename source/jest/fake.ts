/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { asapScheduler, asyncScheduler } from "rxjs";

declare const jest: any;

export function fakeSchedulers(
    fakeTest: (advance: (milliseconds: number) => void) => any
): () => any {
    return () => {
        try {
            let fakeTime = 0;
            asapScheduler.schedule = asyncScheduler.schedule.bind(asyncScheduler) as any;
            asyncScheduler.now = () => fakeTime;
            return fakeTest(milliseconds => {
                fakeTime += milliseconds;
                jest.advanceTimersByTime(milliseconds);
            });
        } finally {
            delete asapScheduler.schedule;
            delete asyncScheduler.now;
        }
    };
}
