import { deleteService } from '../services/delete.js';
import { success, fail } from '../../../utils/envelope.js';
export async function deleteController(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            fail(res, 'Invalid complaint ID', 400);
            return;
        }
        await deleteService(id, req.user.userId, req.user.role);
        success(res, 'Complaint deleted successfully');
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
//# sourceMappingURL=delete.js.map