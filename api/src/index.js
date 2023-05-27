"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("../build/routes");
const fibo_1 = require("./models/fibo");
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)({ limit: '50mb' }));
app.use(body_parser_1.default.json());
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.use(express_1.default.static("public"));
(0, routes_1.RegisterRoutes)(app);
app.get('/', (req, res) => { res.send('Got feedback!'); });
let fiboval = (0, fibo_1.fibo)(7);
app.listen(PORT, () => { console.log('Listening on port ' + PORT + ' ' + fiboval + ' .'); });
let appData = { app: app, fibo: fiboval };
exports.default = appData;
//# sourceMappingURL=index.js.map