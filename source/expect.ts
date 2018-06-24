/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs";
import { argsSymbol } from "./args";
import { assertArgs, assertSubscriptions } from "./assert";
import { ExpectHelpers, TestObservableLike } from "./types";

export class Expect<T> {

    constructor(private actual: Observable<T>, private helpers: ExpectHelpers, private unsubscription?: string) {}

    toBeObservable(expected: TestObservableLike<T>): void;
    toBeObservable(expected: string, values?: { [key: string]: T }, error?: any): void;
    toBeObservable(expected: TestObservableLike<T> | string, values?: { [key: string]: T }, error?: any): void {

        const { actual, helpers, unsubscription } = this;

        if (typeof expected === "string") {
            helpers.expectObservable(actual, unsubscription).toBe(expected, values, error);
        } else {
            assertArgs(expected);
            const { error, marbles, values } = expected[argsSymbol];
            helpers.expectObservable(actual, unsubscription).toBe(marbles, values, error);
        }
    }

    toHaveSubscriptions(expected: string | string[]): void {

        const { actual, helpers } = this;
        assertSubscriptions(actual);
        const { subscriptions } = actual as TestObservableLike<T>;
        helpers.expectSubscriptions(subscriptions).toBe(expected);
    }
}
