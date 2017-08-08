/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs/Observable";
import { ColdObservable } from "rxjs/testing/ColdObservable";
import { HotObservable } from "rxjs/testing/HotObservable";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { argsSymbol } from "./args";
import { assertArgs, assertSubscriptions } from "./assert";
import { configure } from "./configuration";
import { Expect } from "./expect";

export class Context {

    public configure = configure;

    constructor(public testScheduler: TestScheduler) {}

    cold<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): ColdObservable<T> {

        const { testScheduler } = this;
        const observable = testScheduler.createColdObservable<T>(marbles, values, error);
        observable[argsSymbol] = { error, marbles, values };
        return observable;
    }

    equal<T = any>(actual: Observable<T>, expected: Observable<T>): void;
    equal<T = any>(actual: Observable<T>, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: Observable<T>): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, ...args: any[]): void {

        const { testScheduler } = this;
        const [a0, a1, a2, a3] = args;

        if (a1 && (typeof a1 === "string")) {

            testScheduler.expectObservable(actual, a0).toBe(a1, a2, a3);

        } else if (a1 && a1[argsSymbol]) {

            assertArgs(a1);

            const { error, marbles, values } = a1[argsSymbol];
            testScheduler.expectObservable(actual, a0).toBe(marbles, values, error);

        } else if (typeof a0 === "string") {

            testScheduler.expectObservable(actual).toBe(a0, a1, a2);

        } else {

            assertArgs(a0);

            const { error, marbles, values } = a0[argsSymbol];
            testScheduler.expectObservable(actual).toBe(marbles, values, error);
        }
    }

    expect<T = any>(actual: Observable<T>, unsubscription?: string): Expect<T> {

        const { testScheduler } = this;
        return new Expect(actual as any, testScheduler, unsubscription);
    }

    flush(): void {

        const { testScheduler } = this;
        testScheduler.flush();
    }

    has<T = any>(actual: Observable<T>, expected: string | string[]): void {

        assertSubscriptions(actual);

        const { testScheduler } = this;
        testScheduler.expectSubscriptions((actual as any).subscriptions).toBe(expected);
    }

    hot<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): HotObservable<T> {

        const { testScheduler } = this;
        const observable = testScheduler.createHotObservable<T>(marbles, values, error);
        observable[argsSymbol] = { error, marbles, values };
        return observable;
    }

    get scheduler(): TestScheduler {

        const { testScheduler } = this;
        return testScheduler;
    }

    time(marbles: string): number {

        const { testScheduler } = this;
        return testScheduler.createTime(marbles);
    }
}
