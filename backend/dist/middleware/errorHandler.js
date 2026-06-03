import { fail } from '../utils/envelope.js';
export function errorHandler(err, _req, res, _next) {
    console.error('Unhandled error:', err.message, err.stack);
    fail(res, `Internal server error: ${err.message}. Stack: ${err.stack}`, 500);
}
//# sourceMappingURL=errorHandler.js.map