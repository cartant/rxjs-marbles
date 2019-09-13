/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { fakeAsync, tick } from "@angular/core/testing";
import { fakeSchedulers as _fakeSchedulers } from "../fake";

export function fakeSchedulers(
  fakeTest: (tick: (milliseconds: number) => void) => any
): () => any {
  return fakeAsync(
    _fakeSchedulers(() => {
      return fakeTest(milliseconds => {
        /*tslint:disable-next-line:no-console*/
        console.log(
          "The tick parameter passed to the fakeSchedulers test is deprecated; call the @angular/core/testing tick function instead. See the examples for the intended usage."
        );
        tick(milliseconds);
      });
    })
  );
}
