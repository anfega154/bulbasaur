class HttpStatus {
    static OK = 200;
    static CREATED = 201;
    static ACCEPTED = 202;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static INTERNAL_SERVER_ERROR = 500;
    static BAD_GATEWAY = 502;
    static SERVICE_UNAVAILABLE = 503;
}

module.exports = HttpStatus;