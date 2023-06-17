class BodyResponse {
    public code: number;
    public message: string;
    public payload: any;

    constructor (code: number, message: string, payload: any) {
        this.code = code;
        this.message = message;
        this.payload = payload;
    }
}

export { BodyResponse };