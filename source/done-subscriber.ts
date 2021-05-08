/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:rxjs-no-subclass*/

import { noop, Subscriber } from "rxjs";

export class DoneSubscriber<T> extends Subscriber<T> {
  constructor(private onError: (error: any) => void, onComplete: () => void) {
    super({
      complete: onComplete,
      error: onError,
      next: noop,
    });
  }

  unsubscribe(): void {
    try {
      super.unsubscribe();
    } catch (error) {
      this.onError(error);
    }
  }
}
