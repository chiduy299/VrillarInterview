class BodyResponse {
    public code: number;
    public message: string;
    public payload: Object;

    constructor (code: number, message: string, payload: Object) {
        this.code = code;
        this.message = message;
        this.payload = payload;
    }
}

export { BodyResponse };