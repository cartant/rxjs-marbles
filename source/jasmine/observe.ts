/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs";
import { VerboseSubscriber } from "../verbose-subscriber";

export interface DoneFunction {
  (): void;
  fail: (error: any) => void;
}

export function observe<T>(
  observableTest: () => Observable<T>
): (done: DoneFunction) => void {
  return (done: DoneFunction) => {
    const subscriber = new VerboseSubscriber(done.fail, done);
    observableTest().subscribe(subscriber);
  };
}
