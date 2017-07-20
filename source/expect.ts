/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { ColdObservable } from "rxjs/testing/ColdObservable";
import { HotObservable } from "rxjs/testing/HotObservable";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { argsSymbol } from "./args";

export class Expect<T> {

    constructor(private actual: ColdObservable<T> | HotObservable<T>, private testScheduler: TestScheduler) {}

    toBeObservable(expected: ColdObservable<T> | HotObservable<T>): void {

        const { actual, testScheduler } = this;
        const { error, marbles, values } = expected[argsSymbol];
        testScheduler.expectObservable(actual).toBe(marbles, values, error);
    }

    toHaveSubscriptions(expected: string | string[]): void {

        const { actual, testScheduler } = this;
        testScheduler.expectSubscriptions(actual.subscriptions).toBe(expected);
    }
}
