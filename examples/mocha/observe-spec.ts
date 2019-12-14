import { assert, expect } from "chai";
import { observe } from "rxjs-marbles/mocha";
import { of } from "rxjs";
import { finalize, map, tap } from "rxjs/operators";

describe("observe", () => {
  it(
    "should support tests that return an observable",
    observe(() => {
      return of(1).pipe(
        map(value => value.toString()),
        tap(value => expect(value).to.be.a("string"))
      );
    })
  );

  it(
    "should handle assertions in finalize operator",
    observe(() => {
      let haveBeenCalled = false;
      const mock = () => (haveBeenCalled = true);
      return of(1).pipe(
        tap(() => mock()),
        finalize(() => assert.isOk(haveBeenCalled))
      );
    })
  );
});
