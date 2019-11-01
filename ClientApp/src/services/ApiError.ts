export class ApiError implements Error {
    public name = 'ApiError';
    constructor(public message: string) {
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}
