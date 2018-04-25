import { expect } from "chai";
import { marbles } from "rxjs-marbles/mocha";
import { delay } from "rxjs/operators";

describe("reframe", () => {

    it("should support reframing", marbles(m => {

        m.reframe(100, 10000);

        const duration = m.time("--|");
        expect(duration).to.equal(200);

        const source =   m.cold("--(a|)");
        const expected = m.cold("----(a|)");
        m.expect(source.pipe(delay(duration, m.scheduler))).toBeObservable(expected);
    }));
});
