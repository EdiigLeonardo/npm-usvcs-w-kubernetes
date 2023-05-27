import "jasmine";
import { fibo } from "../src/models/fibo";

describe("something", () => {
    it("should work", () => {
        expect(fibo(7)).toBe(13);
        expect(fibo(4)).toBe(3);
    });
});
