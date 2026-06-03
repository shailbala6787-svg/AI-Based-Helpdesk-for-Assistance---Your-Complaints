import { meService } from '../services/me.js';
import { success, fail } from '../../../utils/envelope.js';
export async function meController(req, res, next) {
    try {
        const user = await meService(req.user.userId);
        success(res, 'User fetched successfully', user);
    }
    catch (err) {
        if (err.status) {
            fail(res, err.message, err.status);
        }
        else {
            next(err);
        }
    }
}
//# sourceMappingURL=me.js.map