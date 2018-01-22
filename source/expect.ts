/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { ColdObservable } from "rxjs/testing/ColdObservable";
import { HotObservable } from "rxjs/testing/HotObservable";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { argsSymbol } from "./args";
import { assertArgs, assertSubscriptions } from "./assert";

export class Expect<T> {

    constructor(private actual: ColdObservable<T> | HotObservable<T>, private scheduler: TestScheduler, private unsubscription?: string) {}

    toBeObservable(expected: ColdObservable<T> | HotObservable<T>): void;
    toBeObservable(expected: string, values?: { [key: string]: T }, error?: any): void;
    toBeObservable(expected: ColdObservable<T> | HotObservable<T> | string, values?: { [key: string]: T }, error?: any): void {

        const { actual, scheduler, unsubscription } = this;

        if (typeof expected === "string") {

            scheduler.expectObservable(actual, unsubscription).toBe(expected, values, error);

        } else {

            assertArgs(expected);

            const { error, marbles, values } = expected[argsSymbol];
            scheduler.expectObservable(actual, unsubscription).toBe(marbles, values, error);
        }
    }

    toHaveSubscriptions(expected: string | string[]): void {

        const { actual, scheduler } = this;
        assertSubscriptions(actual);
        scheduler.expectSubscriptions(actual.subscriptions).toBe(expected);
    }
}
