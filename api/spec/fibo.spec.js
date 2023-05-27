"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const fibo_1 = require("../src/models/fibo");
describe("something", () => {
    it("should work", () => {
        expect((0, fibo_1.fibo)(7)).toBe(13);
        expect((0, fibo_1.fibo)(4)).toBe(3);
    });
});
//# sourceMappingURL=fibo.spec.js.map