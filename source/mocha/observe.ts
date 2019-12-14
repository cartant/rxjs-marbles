/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs";
import { VerboseSubscriber } from "../verbose-subscriber";

export type DoneFunction = (error?: Error) => void;

export function observe<T>(
  observableTest: () => Observable<T>
): (done: DoneFunction) => void {
  return (done: DoneFunction) => {
    const subscriber = new VerboseSubscriber(done, done);
    observableTest().subscribe(subscriber);
  };
}
