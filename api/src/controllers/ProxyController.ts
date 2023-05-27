import { Controller, Get, Path, Route, Post, Body} from "tsoa";
import Container from "typedi";
import axios from "axios";
import { ProxyInterface } from "../interfaces/interfaces";
import { NpmResService } from "../services/ProxyService";
import { NpmRes } from "../models/ProxyModel";

@Route("npm")
 export class ProxyController extends Controller {

    @Post("/")
        public async addRegistry(@Body() request: ProxyInterface): Promise<any> {
            let data: string = "";
            let svc = Container.get(NpmResService);
            svc.addRegistry({url: request.url, res: request.res});
            /*await axios.get(url).then(
                    response => {
                    data = response.data;
                    let svc = Container.get(NpmResService);
                    svc.addRegistry({url: url, res: JSON.stringify(data)});
                    return "201 - Created"
                }
                ).catch((err) => {
                    data = JSON.stringify(err);
                });
                return data;*/
        }
    
    @Get("/{id}")
    public async getResultById(@Path() id: number): Promise<ProxyInterface[]> {
        let service = Container.get(NpmResService);
        let ret: ProxyInterface[] = [];
        await service.getResultById(id).then((npmRes: ProxyInterface[]) => {
            npmRes.forEach((values) => {
                ret.push({ url: values.url, res: values.res});
            });
        });

        return ret;
    }
}

@Route("packageInfo")
export class PackageInfoController extends Controller{
    @Get("/")
    public async getPackageInfo(): Promise<any> {
        let data: string = "";
        const url : string = "http://registry.npmjs.org/"
        await axios.get(url).then(
                response => {
                data = response.data;
                return JSON.stringify(data);
            }
            ).catch((err) => {
                data = JSON.stringify(err);
            });
            return data;
    }

    @Get('/{text}')
    public async getInfo(@Path() text: string): Promise<any> {
        const url = `http://registry.npmjs.org/${text}`;
        try {
        const response = await axios.get(url);
        return response.data;
            } catch (error) {
            return error;
        }
    }

    @Get('search/{searchText}')
    public async searchPackage(@Path() searchText: string): Promise<any> {
        const url = `http://registry.npmjs.org/-/v1/search?text=${searchText}`;
        try {
        const response = await axios.get(url);
        return response.data;
        } catch (error) {
        return error;
        }
    }
}


