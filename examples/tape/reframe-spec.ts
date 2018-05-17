import { configure } from "rxjs-marbles/tape";
import { delay } from "rxjs/operators";
import * as test from "tape";

const marbles = configure({ run: false });

test("should support reframing", marbles((m, t) => {

    t.plan(2);
    m.reframe(100, 10000);

    const duration = m.time("--|");
    t.assert(duration === 200, "should calculate the duration");

    const source =   m.cold("--(a|)");
    const expected = m.cold("----(a|)");
    m.expect(source.pipe(delay(duration, m.scheduler))).toBeObservable(expected);
}));
