"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fibo = void 0;
function fibo(index) {
    if (index == 0)
        return 0;
    if (index == 1)
        return 1;
    return fibo(index - 1) + fibo(index - 2);
}
exports.fibo = fibo;
//# sourceMappingURL=fibo.js.map