"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.PackageInfoController = exports.ProxyController = void 0;
const tsoa_1 = require("tsoa");
const typedi_1 = __importDefault(require("typedi"));
const axios_1 = __importDefault(require("axios"));
const ProxyService_1 = require("../services/ProxyService");
let ProxyController = class ProxyController extends tsoa_1.Controller {
    addRegistry(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = "";
            let svc = typedi_1.default.get(ProxyService_1.NpmResService);
            svc.addRegistry({ url: request.url, res: request.res });
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
        });
    }
    getResultById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let service = typedi_1.default.get(ProxyService_1.NpmResService);
            let ret = [];
            yield service.getResultById(id).then((npmRes) => {
                npmRes.forEach((values) => {
                    ret.push({ url: values.url, res: values.res });
                });
            });
            return ret;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "addRegistry", null);
__decorate([
    (0, tsoa_1.Get)("/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "getResultById", null);
ProxyController = __decorate([
    (0, tsoa_1.Route)("npm")
], ProxyController);
exports.ProxyController = ProxyController;
let PackageInfoController = class PackageInfoController extends tsoa_1.Controller {
    getPackageInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = "";
            const url = "https://registry.npmjs.org/";
            yield axios_1.default.get(url).then(response => {
                data = response.data;
                return JSON.stringify(data);
            }).catch((err) => {
                data = JSON.stringify(err);
            });
            return data;
        });
    }
    getInfo(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://registry.npmjs.org/${text}`;
            try {
                const response = yield axios_1.default.get(url);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    searchPackage(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://registry.npmjs.org/-/v1/search?text=${searchText}`;
            try {
                const response = yield axios_1.default.get(url);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PackageInfoController.prototype, "getPackageInfo", null);
__decorate([
    (0, tsoa_1.Get)('/{text}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackageInfoController.prototype, "getInfo", null);
__decorate([
    (0, tsoa_1.Get)('search/{searchText}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackageInfoController.prototype, "searchPackage", null);
PackageInfoController = __decorate([
    (0, tsoa_1.Route)("packageInfo")
], PackageInfoController);
exports.PackageInfoController = PackageInfoController;
//# sourceMappingURL=ProxyController.js.map