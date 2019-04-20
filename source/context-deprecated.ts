/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  Observable,
  queueScheduler,
  SchedulerLike,
  VirtualTimeScheduler
} from "rxjs";

import { TestScheduler } from "rxjs/testing";
import { argsSymbol } from "./args";
import { assertArgs, assertSubscriptions } from "./assert";
import { Configuration } from "./configuration";
import { Context } from "./context";
import { Expect } from "./expect";
import { observableMatcher } from "./matcher";
import { TestObservableLike } from "./types";

export class DeprecatedContext implements Context {
  public autoFlush = true;

  private bindings_: {
    instance: SchedulerLike;
    now?: SchedulerLike["now"];
    schedule?: SchedulerLike["schedule"];
  }[] = [];
  private frameTimeFactor_: number | undefined = undefined;
  private reframable_ = true;
  private scheduler_: TestScheduler | undefined;

  constructor(private configuration_: Configuration) {}

  get scheduler(): TestScheduler {
    if (!this.scheduler_) {
      this.scheduler_ = new TestScheduler((a, b) =>
        observableMatcher(
          a,
          b,
          this.configuration_.assert,
          this.configuration_.assertDeepEqual,
          this.configuration_.frameworkMatcher
        )
      );
    }
    return this.scheduler_;
  }

  bind(...schedulers: SchedulerLike[]): void {
    if (this.bindings_.length !== 0) {
      throw new Error("Schedulers already bound.");
    }
    if (schedulers.length === 0) {
      schedulers = [
        animationFrameScheduler,
        asapScheduler,
        asyncScheduler,
        queueScheduler
      ];
    }

    this.bindings_ = schedulers.map(instance => {
      const now = instance.hasOwnProperty("now") ? instance.now : undefined;
      instance.now = () => this.scheduler.now();
      const schedule = instance.hasOwnProperty("schedule")
        ? instance.schedule
        : undefined;
      instance.schedule = (work, delay, state) =>
        this.scheduler.schedule(work, delay, state);
      return { instance, now, schedule };
    });
  }

  cold<T = any>(
    marbles: string,
    values?: { [key: string]: T },
    error?: any
  ): TestObservableLike<T> {
    const { scheduler } = this;
    this.reframable_ = false;
    const observable = scheduler.createColdObservable<T>(
      marbles,
      values,
      error
    );
    observable[argsSymbol] = { error, marbles, values };
    return observable;
  }

  configure(configuration: Configuration): void {
    if (this.scheduler_) {
      throw new Error(
        "Scheduler already created; call configure before using other context methods and properties."
      );
    }
    this.configuration_ = { ...this.configuration_, ...configuration };
  }

  equal<T = any>(actual: Observable<T>, expected: TestObservableLike<T>): void;
  equal<T = any>(
    actual: Observable<T>,
    expected: string,
    values?: { [key: string]: T },
    error?: any
  ): void;
  equal<T = any>(
    actual: Observable<T>,
    subscription: string,
    expected: TestObservableLike<T>
  ): void;
  equal<T = any>(
    actual: Observable<T>,
    subscription: string,
    expected: string,
    values?: { [key: string]: T },
    error?: any
  ): void;
  equal<T = any>(actual: Observable<T>, ...args: any[]): void {
    const { scheduler } = this;
    const [a0, a1, a2, a3] = args;

    if (a1 && typeof a1 === "string") {
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

  expect<T = any>(actual: Observable<T>, subscription?: string): Expect<T> {
    const { scheduler } = this;
    return new Expect(actual as any, scheduler, subscription);
  }

  flush(): void {
    const { scheduler } = this;
    this.reframable_ = false;
    scheduler.flush();
  }

  has<T = any>(actual: Observable<T>, expected: string | string[]): void {
    assertSubscriptions(actual);

    const { scheduler } = this;
    scheduler.expectSubscriptions((actual as any).subscriptions).toBe(expected);
  }

  hot<T = any>(
    marbles: string,
    values?: { [key: string]: T },
    error?: any
  ): TestObservableLike<T> {
    const { scheduler } = this;
    this.reframable_ = false;
    const observable = scheduler.createHotObservable<T>(marbles, values, error);
    observable[argsSymbol] = { error, marbles, values };
    return observable;
  }

  reframe(timePerFrame: number, maxTime?: number): void {
    if (!this.reframable_) {
      throw new Error("Cannot reframe; scheduler already used.");
    }
    if (maxTime === undefined) {
      maxTime = timePerFrame * 75;
    }

    this.frameTimeFactor_ =
      (VirtualTimeScheduler as any).frameTimeFactor ||
      (TestScheduler as any).frameTimeFactor;
    (VirtualTimeScheduler as any).frameTimeFactor = timePerFrame;
    (TestScheduler as any).frameTimeFactor = timePerFrame;

    const { scheduler } = this;
    scheduler.maxFrames = maxTime;
  }

  teardown(): void {
    try {
      if (this.autoFlush) {
        this.scheduler.flush();
      }
    } finally {
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

      if (this.frameTimeFactor_) {
        (VirtualTimeScheduler as any).frameTimeFactor = this.frameTimeFactor_;
        (TestScheduler as any).frameTimeFactor = this.frameTimeFactor_;
      }
    }
  }

  time(marbles: string): number {
    const { scheduler } = this;
    this.reframable_ = false;
    return scheduler.createTime(marbles);
  }
}
