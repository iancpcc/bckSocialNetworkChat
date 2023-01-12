import HTTPStatusCode from 'http-status-codes';

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;
    constructor(message: string) {
        super(message);
    }

    errorSerialized(): {} {
        return {
            statusCode: this.statusCode,
            status: this.status,
            message: this.message
        }
    }

}

export class NotFoundError extends CustomError {
    statusCode: number;
    status: string;
    constructor(message: string) {
        super(message);
        this.statusCode = HTTPStatusCode.NOT_FOUND;
        this.status = "Not Found";
    }

}