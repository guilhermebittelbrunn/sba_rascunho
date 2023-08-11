//tw
module.exports = class CustomError extends Error {
    constructor(message, status, additional) {
        super(message);
        if (additional === undefined && typeof status === 'object') {
            this.status = 500;
            this.additional = status;
            return;
        }
        this.status = status;
        this.additional = additional;
    }
};
