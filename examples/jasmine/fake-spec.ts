import "zone.js";
import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/proxy.js";
import "zone.js/dist/sync-test";
import "zone.js/dist/jasmine-patch";
import "zone.js/dist/async-test";
import "zone.js/dist/fake-async-test";

import { fakeSchedulers } from "rxjs-marbles/jasmine/angular";
import { of, timer } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

describe("fakeSchedulers", () => {

    it("should support a timer", fakeSchedulers(tick => {
        let received: number | undefined;
        timer(100).subscribe(value => received = value);
        tick(50);
        expect(received).not.toBeDefined();
        tick(50);
        expect(received).toBe(0);
    }));

    it("should support delay", fakeSchedulers(tick => {
        let received: number | undefined;
        of(1).pipe(delay(100)).subscribe(value => received = value);
        tick(50);
        expect(received).not.toBeDefined();
        tick(50);
        expect(received).toBe(1);
    }));
});
