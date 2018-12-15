import test from "ava";
import { configure } from "rxjs-marbles/ava";
import { delay } from "rxjs/operators";

const { marbles } = configure({ run: false });

test("should support reframing", marbles((m, t) => {

    t.plan(2);
    m.reframe(100, 10000);

    const duration = m.time("--|");
    t.is(duration, 200);

    const source =   m.cold("--(a|)");
    const expected = m.cold("----(a|)");
    m.expect(source.pipe(delay(duration, m.scheduler))).toBeObservable(expected);
}));
