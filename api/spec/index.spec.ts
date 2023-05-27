import request from "supertest";
import "jasmine";
import appData from "../src/index";
//import { SumTask } from "../src/models/SumTask";

describe("index", () => {

    it("test fiboval in entry point", async () => {
        expect(appData.app).toBeTruthy();
        expect(appData.fibo).toBe(13);
    });


    it("test get /", async () => {
        expect(appData.app).toBeTruthy();
        const response = await request(appData.app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Got feedback!');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    it("test get /packageInfo", async () => {
        expect(appData.app).toBeTruthy();
        const response = await request(appData.app).get('/packageInfo');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('couch_bt_engine');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    it("test get /packageInfo/axios", async () => {
        expect(appData.app).toBeTruthy();
        const response = await request(appData.app).get('/packageInfo/axios');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Promise based HTTP client for the browser and node.js');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    it("test get /packageInfo/search/axios", async () => {
        expect(appData.app).toBeTruthy();
        const response = await request(appData.app).get('/packageInfo/search/axios');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Matt Zabriskie');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });
    
});
