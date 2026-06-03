export function success(res, message, data, statusCode = 200) {
    const body = { status: 'success', message };
    if (data !== undefined)
        body.data = data;
    res.status(statusCode).json(body);
}
export function fail(res, message, statusCode = 400, error) {
    const body = { status: 'fail', message };
    if (error !== undefined)
        body.error = error;
    res.status(statusCode).json(body);
}
//# sourceMappingURL=envelope.js.map