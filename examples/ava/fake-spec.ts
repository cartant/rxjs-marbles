import test from "ava";
import { fakeSchedulers } from "rxjs-marbles/ava";
import { of, timer } from "rxjs";
import { delay } from "rxjs/operators";
import * as sinon from "sinon";

test(
  "it should support a timer",
  fakeSchedulers(t => {
    t.plan(2);
    const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();
    let received: number | undefined;
    timer(100).subscribe(value => (received = value));
    clock.tick(50);
    t.is(received, undefined);
    clock.tick(50);
    t.is(received, 0);
    clock.restore();
  })
);

test(
  "it should support delay",
  fakeSchedulers(t => {
    t.plan(2);
    const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();
    let received: number | undefined;
    of(1)
      .pipe(delay(100))
      .subscribe(value => (received = value));
    clock.tick(50);
    t.is(received, undefined);
    clock.tick(50);
    t.is(received, 1);
    clock.restore();
  })
);
