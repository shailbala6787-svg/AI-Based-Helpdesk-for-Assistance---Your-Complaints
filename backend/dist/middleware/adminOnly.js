import { ROLES } from '../constants/roles.js';
import { fail } from '../utils/envelope.js';
export function adminOnly(req, res, next) {
    if (!req.user || req.user.role !== ROLES.ADMIN) {
        fail(res, 'Admin access required', 403);
        return;
    }
    next();
}
//# sourceMappingURL=adminOnly.js.map