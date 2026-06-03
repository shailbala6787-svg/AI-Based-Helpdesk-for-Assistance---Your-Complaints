import { createComplaintDto } from '../dtos/create.js';
import { createService } from '../services/create.js';
import { success, fail } from '../../../utils/envelope.js';
export async function createController(req, res, next) {
    try {
        const parsed = createComplaintDto.safeParse(req.body);
        if (!parsed.success) {
            fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
            return;
        }
        const complaint = await createService(req.user.userId, parsed.data);
        success(res, 'Complaint created successfully', complaint, 201);
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
//# sourceMappingURL=create.js.map