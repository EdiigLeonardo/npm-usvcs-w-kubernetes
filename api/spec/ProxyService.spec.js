"use strict";
/*import "jasmine";
import { Model } from "sequelize-typescript";
import Container from "typedi";
import { NpmResService } from "../src/services/ProxyService";
import { ProxyController } from "../src/controllers/ProxyController";
import { NpmRes } from "../src/models/ProxyModel";


describe("ProxyService", () => {

    it("test saveAdd", async () => {
        let svc = Container.get(NpmResService);

        spyOn(NpmResService, 'create').and.callFake((data) => {
            return new Promise<any>((resolve, reject) => { });
        });

        svc.syncPromise = new Promise<any>((resolve, reject) => {
            resolve(null);
        });

        //await svc.saveAdd(r);

        const url1 = "https://registry.npmjs.org/";

        const expectedResponse1 = `"db_name":"registry","engine":"couch_bt_engine","doc_count":3573344,"doc_del_count":332,"update_seq":35317530"`;

        const proxyController = new ProxyController();

        const response = await proxyController.addRegistry(url1);

        expect(response).toContain(expectedResponse1);
    });
});*/ 
//# sourceMappingURL=ProxyService.spec.js.map