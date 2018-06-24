import { fakeSchedulers } from "rxjs-marbles/mocha";
import { of, timer } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import * as sinon from "sinon";

describe("fakeSchedulers", () => {

    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    it("should support a timer", fakeSchedulers(() => {
        let received: number | undefined;
        timer(100).subscribe(value => received = value);
        clock.tick(50);
        expect(received).not.toBeDefined();
        clock.tick(50);
        expect(received).toBe(0);
    }));

    it("should support delay", fakeSchedulers(() => {
        let received: number | undefined;
        of(1).pipe(delay(100)).subscribe(value => received = value);
        clock.tick(50);
        expect(received).not.toBeDefined();
        clock.tick(50);
        expect(received).toBe(1);
    }));

    afterEach(() => {
        clock.restore();
    });
});
