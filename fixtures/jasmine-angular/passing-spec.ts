/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */
/*tslint:disable:object-literal-sort-keys*/

import "zone.js";
import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/proxy.js";
import "zone.js/dist/sync-test";
import "zone.js/dist/jasmine-patch";
import "zone.js/dist/async-test";
import "zone.js/dist/fake-async-test";

import { tick } from "@angular/core/testing";
import { asapScheduler, of, timer } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import { fakeSchedulers } from "../../dist/jasmine/angular";

describe("fakeSchedulers", () => {

    it("should support a timer", fakeSchedulers(() => {
        let received: number | undefined;
        timer(100).subscribe(value => received = value);
        tick(50);
        expect(received).not.toBeDefined();
        tick(50);
        expect(received).toBe(0);
    }));

    it("should support delay", fakeSchedulers(() => {
        let received: number | undefined;
        of(1).pipe(delay(100)).subscribe(value => received = value);
        tick(50);
        expect(received).not.toBeDefined();
        tick(50);
        expect(received).toBe(1);
    }));

    it("should support the asapScheduler", fakeSchedulers(() => {
        let received: number | undefined;
        of(1).pipe(delay(0, asapScheduler)).subscribe(value => received = value);
        expect(received).not.toBeDefined();
        tick(0);
        expect(received).toBe(1);
    }));
});
