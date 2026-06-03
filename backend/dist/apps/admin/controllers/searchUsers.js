import { searchUsersService } from '../services/searchUsers.js';
import { success, fail } from '../../../utils/envelope.js';
export async function searchUsersController(req, res, next) {
    try {
        const query = req.query.query || '';
        const users = await searchUsersService(query);
        success(res, 'Users fetched successfully', users);
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
//# sourceMappingURL=searchUsers.js.map