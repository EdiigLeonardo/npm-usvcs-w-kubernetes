import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '../build/routes';
import { ProxyController, PackageInfoController } from './controllers/ProxyController';
import { fibo } from "./models/fibo";
import cors from 'cors';
import { NpmResService } from './services/ProxyService';

export interface AppData {
    app: express.Express;
    fibo: number;
}

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.json());
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);
app.use(express.static("public"));
RegisterRoutes(app);
app.get('/', (req, res) => { res.send('Got feedback!'); });

let fiboval = fibo(7);
app.listen(PORT, () => { console.log('Listening on port ' + PORT + ' ' + fiboval + ' .'); });
let appData: AppData = { app: app, fibo: fiboval };
export default appData;