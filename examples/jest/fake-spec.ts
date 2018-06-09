import { fakeSchedulers } from "rxjs-marbles/jest";
import { of, timer } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

describe("fakeSchedulers", () => {

    beforeEach(() => jest.useFakeTimers());

    it("should support a timer", fakeSchedulers(advance => {
        let received: number | undefined;
        timer(100).subscribe(value => received = value);
        advance(50);
        expect(received).not.toBeDefined();
        advance(50);
        expect(received).toBe(0);
    }));

    it("should support delay", fakeSchedulers(advance => {
        let received: number | undefined;
        of(1).pipe(delay(100)).subscribe(value => received = value);
        advance(50);
        expect(received).not.toBeDefined();
        advance(50);
        expect(received).toBe(1);
    }));
});
