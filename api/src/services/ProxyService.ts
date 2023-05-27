import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Service } from 'typedi';
import {ProxyInterface} from '../interfaces/interfaces';
import { NpmRes} from '../models/ProxyModel';

@Service()
export class NpmResService {
    sequelize: Sequelize;
    syncPromiseProxy: any;

    constructor() {


        console.log("Created ProxyService");
        this.sequelize = new Sequelize('testdb', 'userx', 'passx', {
            dialect: 'mariadb',
            host: 'mariadb',
            dialectOptions: {
            }
        });

        this.sequelize.addModels([NpmRes]);

        this.syncPromiseProxy = NpmRes.sync();

        this.syncPromiseProxy.catch((err: any) => {
            console.log("Issue with sync: " + JSON.stringify(err));
        });
    }

    public async addRegistry(arg0: { url: string; res: string; }) {
            await this.syncPromiseProxy;
            NpmRes.create({ url: arg0.url, res: arg0.res});
            //await this.sequelize.query("ALTER TABLE NpmRes MODIFY res VARCHAR(16000);");
            await this.sequelize.query("ALTER TABLE NpmRes MODIFY COLUMN res TEXT;");
        }

    public async getResultById(id: number): Promise<ProxyInterface[]> {
        return NpmRes.findAll({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }
}
