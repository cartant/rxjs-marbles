import { observe } from "rxjs-marbles/jasmine";
import { of } from "rxjs";
import { finalize, map, tap } from "rxjs/operators";

describe("observe", () => {
  it(
    "should support tests that return an observable",
    observe(() => {
      return of(1).pipe(
        map(value => value.toString()),
        tap(value => expect(typeof value).toEqual("string"))
      );
    })
  );

  it(
    "should handle assertions in finalize operator",
    observe(() => {
      const mock = jasmine.createSpy();
      return of(1).pipe(
        tap(() => mock()),
        finalize(() => expect(mock).toHaveBeenCalled())
      );
    })
  );
});
