"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
require("jasmine");
const index_1 = __importDefault(require("../src/index"));
//import { SumTask } from "../src/models/SumTask";
describe("index", () => {
    it("test fiboval in entry point", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(index_1.default.app).toBeTruthy();
        expect(index_1.default.fibo).toBe(13);
    }));
    it("test get /", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(index_1.default.app).toBeTruthy();
        const response = yield (0, supertest_1.default)(index_1.default.app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Got feedback!');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    }));
    it("test get /packageInfo", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(index_1.default.app).toBeTruthy();
        const response = yield (0, supertest_1.default)(index_1.default.app).get('/packageInfo');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('couch_bt_engine');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    }));
    it("test get /packageInfo/axios", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(index_1.default.app).toBeTruthy();
        const response = yield (0, supertest_1.default)(index_1.default.app).get('/packageInfo/axios');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Promise based HTTP client for the browser and node.js');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    }));
    it("test get /packageInfo/search/axios", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(index_1.default.app).toBeTruthy();
        const response = yield (0, supertest_1.default)(index_1.default.app).get('/packageInfo/search/axios');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Matt Zabriskie');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    }));
});
//# sourceMappingURL=index.spec.js.map