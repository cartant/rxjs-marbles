/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Observable, SchedulerLike } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { Configuration } from "./configuration";
import { Expect } from "./expect";
import { TestObservableLike } from "./types";

export interface Context {
    /** @deprecated */
    autoFlush: boolean;
    readonly scheduler: TestScheduler;
    /** @deprecated */
    bind(...schedulers: SchedulerLike[]): void;
    cold<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): TestObservableLike<T>;
    /** @deprecated */
    configure(configuration: Configuration): void;
    equal<T = any>(actual: Observable<T>, expected: TestObservableLike<T>): void;
    equal<T = any>(actual: Observable<T>, expected: string, values?: { [key: string]: T }, error?: any): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: TestObservableLike<T>): void;
    equal<T = any>(actual: Observable<T>, unsubscription: string, expected: string, values?: { [key: string]: T }, error?: any): void;
    expect<T = any>(actual: Observable<T>, unsubscription?: string): Expect<T>;
    flush(): void;
    has<T = any>(actual: Observable<T>, expected: string | string[]): void;
    hot<T = any>(marbles: string, values?: { [key: string]: T }, error?: any): TestObservableLike<T>;
    /** @deprecated */
    reframe(timePerFrame: number, maxTime?: number): void;
    /** @deprecated */
    teardown(): void;
    time(marbles: string): number;
}
