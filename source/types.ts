/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs";

export type TestObservableLike<T> = Observable<T> & { subscriptions: any[] };
