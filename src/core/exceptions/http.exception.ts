class HttpException extends Error {
    public status: number;
    public code: number;
    public message: string;

    constructor(status: number, code: number, errMessage: string) {
        super(errMessage);
        this.status = status;
        this.code = code;
        this.message = errMessage;
    }
}

export default HttpException;