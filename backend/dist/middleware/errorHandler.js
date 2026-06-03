import { fail } from '../utils/envelope.js';
export function errorHandler(err, _req, res, _next) {
    console.error('Unhandled error:', err.message);
    fail(res, 'Internal server error', 500);
}
//# sourceMappingURL=errorHandler.js.map