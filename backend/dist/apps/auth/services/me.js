import { usersDAL } from '../../../db/dal/users.js';
export async function meService(userId) {
    const user = await usersDAL.findById(userId);
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    const { passwordHash, ...userData } = user;
    return userData;
}
//# sourceMappingURL=me.js.map