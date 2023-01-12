import { CustomError, NotFoundError } from './features/helpers/error-handler'
import express, { Application, NextFunction, Request, Response, json, urlencoded } from 'express'

import Config from './config';
import HttpStatusCode from 'http-status-codes'
import bunyan from 'bunyan';
import compression from 'compression'
import cookieSession from 'cookie-session'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'

export class SetupServer {
    private readonly app: Application;
    private readonly logger = Config.createLogger("setupServer");

    constructor(private readonly SERVER_PORT: (string | number) = Config.SERVER_PORT!) {
        this.app = express();
        this.SERVER_PORT = SERVER_PORT;
    }
    start(): void {
        this.securityMiddleware();
        this.standartMiddleware();
        this.startServer();
        this.routes();
        this.globalErrorHandler()
    }

    private securityMiddleware(): void {

        cookieSession({
            name: 'session',
            keys: [Config.SECRET_KEY_ONE!, Config.SECRET_KEY_TWO!],
            maxAge: 24 * 7 * 3600000,
            secure: Config.NODE_ENV === 'PROD'
        })

        this.app.use(helmet());
        this.app.use(hpp());
        this.app.use(cors({
            origin: "*", // www.domain.com 
            credentials: true,
            methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
        }));


    }

    private standartMiddleware(): void {
        this.app.use(compression())
        this.app.use(json({ limit: '50mb' }))
        this.app.use(urlencoded({ extended: true, limit: '50mb' }))
    }

    private startServer(): void {
        try {
            this.app.listen(this.SERVER_PORT);
            this.logger.info(`🟢 Server Online in port: ${this.SERVER_PORT}`)
            // console.log('🟢 Server Online in port: ', this.SERVER_PORT);

        } catch (error) {
            this.logger.info(`🔴 Server is Offline: ${error}`)
            // console.log('🔴 Server is Offline: ', error);
        }
    }

    private routes(): void {
        this.app.all('/', (_, res) => res.json("Welcome to api v0.1"))
    }

    private globalErrorHandler() {
        this.app.all("*", (req) => { throw new NotFoundError(`The url ${req.originalUrl} not found`) })

        this.app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
            if (error instanceof NotFoundError) {
                return res.status(error.statusCode).json(error.errorSerialized())
            }
            next();
        })
    }




}
