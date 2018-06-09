/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { fakeAsync, tick } from "@angular/core/testing";
import { asyncScheduler } from "rxjs";

export function fakeSchedulers(
    fakeTest: (tick: (milliseconds: number) => void) => void
): () => void {
    return fakeAsync(() => {
        try {
            let fakeTime = 0;
            asyncScheduler.now = () => fakeTime;
            fakeTest(milliseconds => {
                fakeTime += milliseconds;
                tick(milliseconds);
            });
        } finally {
            delete asyncScheduler.now;
        }
    });
}
