import { listService } from '../services/list.js';
import { success, fail } from '../../../utils/envelope.js';
export async function listController(req, res, next) {
    try {
        const complaints = await listService(req.user.userId, req.user.role);
        success(res, 'Complaints fetched successfully', complaints);
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
//# sourceMappingURL=list.js.map