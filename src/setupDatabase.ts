import mongoose, { Mongoose } from 'mongoose'

import Config from './config';

export default class MongoDB {
    private readonly logger = Config.createLogger("setupDB");

    private readonly mongooseDB: Mongoose;

    constructor() {
        this.mongooseDB = mongoose;
    }

    startDB(): void {
        this.mongooseDB.set("strictQuery", false);
        this.mongooseDB.connect(Config.MONGODB_URL!, {})
            .then(success => this.logger.info('🟢 Database Online'))
            .catch(error => this.logger.info('🔴 Database Offline:', error));
    }

}