import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import bunyan from 'bunyan'

dotenv.config()

export default class Config {

    static readonly MONGODB_URL: (string | undefined) = process.env.MONGODB_URL;
    static readonly SECRET_KEY_ONE: (string | undefined) = process.env.SECRET_KEY_ONE;
    static readonly NODE_ENV: (string | undefined) = process.env.NODE_ENV;
    static readonly SECRET_KEY_TWO: (string | undefined) = process.env.SECRET_KEY_TWO;
    static readonly SERVER_PORT: (string | number | undefined) = process.env.SERVER_PORT ?? 3000;

    // constructor (){
    //     this.MONGODB_URL = process.env.MONGODB_URL;
    //     this.SECRET_KEY =  process.env.SECRET_KEY;
    //     this.SERVER_PORT = process.env.SERVER_PORT;
    // }

    static createLogger(name: string) {
        return bunyan.createLogger({ name, level: "debug" });
    }

    static validateConfig(): void {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) { throw new Error(`Configuration key ${key} is undefined `) }
        }
    }

}