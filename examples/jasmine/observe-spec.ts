import { observe } from "rxjs-marbles/jasmine";
import { of } from "rxjs";
import { map, tap } from "rxjs/operators";

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
});
