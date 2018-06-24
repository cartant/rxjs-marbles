/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
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
        expect(received).to.be.undefined;
        clock.tick(50);
        expect(received).to.equal(0);
    }));

    it("should support delay", fakeSchedulers(() => {
        let received: number | undefined;
        of(1).pipe(delay(100)).subscribe(value => received = value);
        clock.tick(50);
        expect(received).to.be.undefined;
        clock.tick(50);
        expect(received).to.equal(1);
    }));

    afterEach(() => {
        clock.restore();
    });
});
