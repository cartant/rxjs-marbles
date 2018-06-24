import { fakeSchedulers } from "rxjs-marbles/tape";
import { of, timer } from "rxjs";
import { delay } from "rxjs/operators";
import * as sinon from "sinon";
import * as tape from "tape";

tape("it should support a timer", fakeSchedulers(t => {
    t.plan(2);
    const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();
    let received: number | undefined;
    timer(100).subscribe(value => received = value);
    clock.tick(50);
    t.equals(received, undefined);
    clock.tick(50);
    t.equals(received, 0);
    clock.restore();
}));

tape("it should support delay", fakeSchedulers(t => {
    t.plan(2);
    const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();
    let received: number | undefined;
    of(1).pipe(delay(100)).subscribe(value => received = value);
    clock.tick(50);
    t.equals(received, undefined);
    clock.tick(50);
    t.equals(received, 1);
    clock.restore();
}));
