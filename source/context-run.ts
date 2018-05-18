/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable, SchedulerLike } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { argsSymbol } from "./args";
import { assertArgs, assertSubscriptions } from "./assert";
import { Configuration } from "./configuration";
import { Context } from "./context";
import { Expect } from "./expect";
import { RunHelpers, TestObservableLike } from "./types";

export class RunContext implements Context {

    constructor(
        public readonly scheduler: TestScheduler,
        private helpers_: RunHelpers
    ) {}

    get autoFlush(): boolean {

        throw notSupported("autoFlush");
    }

    set autoFlush(value: boolean) {

        throw notSupported("autoFlush");
    }

    bind(...schedulers: SchedulerLike[]): void {

        throw notSupported("bind");
    }

    cold<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): TestObservableLike<T> {

        const { helpers_ } = this;
        const observable = helpers_.cold<T>(marbles, values, error);
        observable[argsSymbol] = { error, marbles, values };
        return observable;
    }

    configure(configuration: Configuration): void {

        throw notSupported("configure");
    }

    equal<T = any>(actual: Observable<T>, expected: TestObservableLike<T>): void;
    equal<T = any>(actual: Observable<T>, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: TestObservableLike<T>): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, ...args: any[]): void {

        const { helpers_ } = this;
        const [a0, a1, a2, a3] = args;

        if (a1 && (typeof a1 === "string")) {

            helpers_.expectObservable(actual, a0).toBe(a1, a2, a3);

        } else if (a1 && a1[argsSymbol]) {

            assertArgs(a1);

            const { error, marbles, values } = a1[argsSymbol];
            helpers_.expectObservable(actual, a0).toBe(marbles, values, error);

        } else if (typeof a0 === "string") {

            helpers_.expectObservable(actual).toBe(a0, a1, a2);

        } else {

            assertArgs(a0);

            const { error, marbles, values } = a0[argsSymbol];
            helpers_.expectObservable(actual).toBe(marbles, values, error);
        }
    }

    expect<T = any>(actual: Observable<T>, unsubscription?: string): Expect<T> {

        const { helpers_ } = this;
        return new Expect(actual as any, helpers_, unsubscription);
    }

    flush(): void {

        this.helpers_.flush();
    }

    has<T = any>(actual: Observable<T>, expected: string | string[]): void {

        assertSubscriptions(actual);

        const { helpers_ } = this;
        helpers_.expectSubscriptions((actual as any).subscriptions).toBe(expected);
    }

    hot<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): TestObservableLike<T> {

        const { helpers_ } = this;
        const observable = helpers_.hot<T>(marbles, values, error);
        observable[argsSymbol] = { error, marbles, values };
        return observable;
    }

    reframe(timePerFrame: number, maxTime?: number): void {

        throw notSupported("reframe");
    }

    teardown(): void {

        throw notSupported("teardown");
    }

    time(marbles: string): number {

        const messages = TestScheduler.parseMarbles(marbles, undefined, undefined, undefined, true);
        const complete = messages.find(({ notification }) => notification.kind === "C");
        if (complete) {
            return complete.frame;
        }
        return this.scheduler.createTime(marbles);
    }
}

function notSupported(name: string): Error {

    return new Error(`${name} is not supported when using the latest TestScheduler. For the deprecated behaviour, use 'const { marbles } = configure({ run: false })'.`);
}
