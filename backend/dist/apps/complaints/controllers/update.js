import { updateComplaintDto } from '../dtos/update.js';
import { updateService } from '../services/update.js';
import { success, fail } from '../../../utils/envelope.js';
export async function updateController(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            fail(res, 'Invalid complaint ID', 400);
            return;
        }
        const parsed = updateComplaintDto.safeParse(req.body);
        if (!parsed.success) {
            fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
            return;
        }
        const complaint = await updateService(id, req.user.userId, req.user.role, parsed.data);
        success(res, 'Complaint updated successfully', complaint);
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
//# sourceMappingURL=update.js.map