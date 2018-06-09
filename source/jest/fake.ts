/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { asyncScheduler } from "rxjs";

declare const jest: any;

export function fakeSchedulers(
    fakeTest: (advance: (milliseconds: number) => void) => void
): () => void {
    return () => {
        try {
            let fakeTime = 0;
            asyncScheduler.now = () => fakeTime;
            fakeTest(milliseconds => {
                fakeTime += milliseconds;
                jest.advanceTimersByTime(milliseconds);
            });
        } finally {
            delete asyncScheduler.now;
        }
    };
}
