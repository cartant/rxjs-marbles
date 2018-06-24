/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { fakeAsync, tick } from "@angular/core/testing";
import { asyncScheduler } from "rxjs";

export function fakeSchedulers<R>(
    fakeTest: (tick: (milliseconds: number) => void) => R
): () => R {
    return fakeAsync(() => {
        try {
            asyncScheduler.now = () => Date.now();
            return fakeTest(milliseconds => {
                /*tslint:disable-next-line:no-console*/
                console.log("The tick parameter passed to the fakeSchedulers test is deprecated; call the @angular/core/testing tick function instead. See the examples for the intended usage.");
                tick(milliseconds);
            });
        } finally {
            delete asyncScheduler.now;
        }
    });
}
