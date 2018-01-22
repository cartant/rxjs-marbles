/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable } from "rxjs/Observable";
import { IScheduler } from "rxjs/Scheduler";
import { animationFrame } from "rxjs/scheduler/animationFrame";
import { asap } from "rxjs/scheduler/asap";
import { async } from "rxjs/scheduler/async";
import { queue } from "rxjs/scheduler/queue";
import { ColdObservable } from "rxjs/testing/ColdObservable";
import { HotObservable } from "rxjs/testing/HotObservable";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { argsSymbol } from "./args";
import { assertArgs, assertSubscriptions } from "./assert";
import { configure } from "./configuration";
import { Expect } from "./expect";

export class Context {

    public autoFlush = true;
    public configure = configure;

    private bindings_: {
        instance: IScheduler,
        now?: IScheduler["now"],
        schedule?: IScheduler["schedule"]
    }[] = [];

    constructor(public readonly scheduler: TestScheduler) {}

    bind(...schedulers: IScheduler[]): void {

        if (this.bindings_.length !== 0) {
            throw new Error("Schedulers already bound.");
        }
        if (schedulers.length === 0) {
            schedulers = [animationFrame, asap, async, queue];
        }

        this.bindings_ = schedulers.map(instance => {
            const now = instance.hasOwnProperty("now") ? instance.now : undefined;
            instance.now = () => this.scheduler.now();
            const schedule = instance.hasOwnProperty("schedule") ? instance.schedule : undefined;
            instance.schedule = (work, delay, state) => this.scheduler.schedule(work, delay, state);
            return { instance, now, schedule };
        });
    }

    cold<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): ColdObservable<T> {

        const { scheduler } = this;
        const observable = scheduler.createColdObservable<T>(marbles, values, error);
        observable[argsSymbol] = { error, marbles, values };
        return observable;
    }

    equal<T = any>(actual: Observable<T>, expected: Observable<T>): void;
    equal<T = any>(actual: Observable<T>, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: Observable<T>): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, ...args: any[]): void {

        const { scheduler } = this;
        const [a0, a1, a2, a3] = args;

        if (a1 && (typeof a1 === "string")) {

            scheduler.expectObservable(actual, a0).toBe(a1, a2, a3);

        } else if (a1 && a1[argsSymbol]) {

            assertArgs(a1);

            const { error, marbles, values } = a1[argsSymbol];
            scheduler.expectObservable(actual, a0).toBe(marbles, values, error);

        } else if (typeof a0 === "string") {

            scheduler.expectObservable(actual).toBe(a0, a1, a2);

        } else {

            assertArgs(a0);

            const { error, marbles, values } = a0[argsSymbol];
            scheduler.expectObservable(actual).toBe(marbles, values, error);
        }
    }

    expect<T = any>(actual: Observable<T>, unsubscription?: string): Expect<T> {

        const { scheduler } = this;
        return new Expect(actual as any, scheduler, unsubscription);
    }

    flush(): void {

        const { scheduler } = this;
        scheduler.flush();
    }

    has<T = any>(actual: Observable<T>, expected: string | string[]): void {

        assertSubscriptions(actual);

        const { scheduler } = this;
        scheduler.expectSubscriptions((actual as any).subscriptions).toBe(expected);
    }

    hot<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): HotObservable<T> {

        const { scheduler } = this;
        const observable = scheduler.createHotObservable<T>(marbles, values, error);
        observable[argsSymbol] = { error, marbles, values };
        return observable;
    }

    teardown(): void {

        if (this.autoFlush) {
            this.scheduler.flush();
        }

        this.bindings_.forEach(({ instance, now, schedule }) => {
            if (now) {
                instance.now = now;
            } else {
                delete instance.now;
            }
            if (schedule) {
                instance.schedule = schedule;
            } else {
                delete instance.schedule;
            }
        });
    }

    time(marbles: string): number {

        const { scheduler } = this;
        return scheduler.createTime(marbles);
    }
}
