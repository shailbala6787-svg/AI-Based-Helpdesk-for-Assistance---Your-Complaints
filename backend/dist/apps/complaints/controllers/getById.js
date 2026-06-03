import { getByIdService } from '../services/getById.js';
import { success, fail } from '../../../utils/envelope.js';
export async function getByIdController(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            fail(res, 'Invalid complaint ID', 400);
            return;
        }
        const complaint = await getByIdService(id, req.user.userId, req.user.role);
        success(res, 'Complaint fetched successfully', complaint);
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
//# sourceMappingURL=getById.js.map