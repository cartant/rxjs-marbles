/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs/Observable";
import { argsSymbol } from "./args";

export function assertArgs<T>(observable: Observable<T>): void {

    if (!observable[argsSymbol]) {
        throw new Error("Expected a hot or cold test observable.");
    }
}

export function assertSubscriptions<T>(observable: Observable<T>): void {

    if (!observable["subscriptions"]) {
        throw new Error("Expected a hot or cold test observable with subscriptions.");
    }
}
