/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs";
import { TestScheduler } from "rxjs/testing";

export interface ExpectHelpers {
  expectObservable: typeof TestScheduler.prototype.expectObservable;
  expectSubscriptions: typeof TestScheduler.prototype.expectSubscriptions;
}

export interface RunHelpers {
  cold: typeof TestScheduler.prototype.createColdObservable;
  expectObservable: typeof TestScheduler.prototype.expectObservable;
  expectSubscriptions: typeof TestScheduler.prototype.expectSubscriptions;
  flush: typeof TestScheduler.prototype.flush;
  hot: typeof TestScheduler.prototype.createHotObservable;
}

export type TestObservableLike<T> = Observable<T> & { subscriptions: any[] };
