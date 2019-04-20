import { fakeSchedulers } from "rxjs-marbles/jasmine";
import { of, timer } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

describe("fakeSchedulers", () => {
  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(0));
  });

  it(
    "should support a timer",
    fakeSchedulers(() => {
      let received: number | undefined;
      timer(100).subscribe(value => (received = value));
      jasmine.clock().tick(50);
      expect(received).not.toBeDefined();
      jasmine.clock().tick(50);
      expect(received).toBe(0);
    })
  );

  it(
    "should support delay",
    fakeSchedulers(() => {
      let received: number | undefined;
      of(1)
        .pipe(delay(100))
        .subscribe(value => (received = value));
      jasmine.clock().tick(50);
      expect(received).not.toBeDefined();
      jasmine.clock().tick(50);
      expect(received).toBe(1);
    })
  );

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
