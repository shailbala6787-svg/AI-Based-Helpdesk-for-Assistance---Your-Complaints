import { usersDAL } from '../../../db/dal/users.js';
import { compareValue } from '../../../utils/hash.js';
import { signToken } from '../../../utils/jwt.js';
export async function loginService(data) {
    const user = await usersDAL.findByEmail(data.email);
    if (!user) {
        throw { status: 401, message: 'Invalid email or password' };
    }
    if (!user.verified) {
        throw { status: 403, message: 'Email not verified. Please verify your email first' };
    }
    const isValid = await compareValue(data.password, user.passwordHash);
    if (!isValid) {
        throw { status: 401, message: 'Invalid email or password' };
    }
    const token = signToken({ userId: user.id, role: user.role });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}
//# sourceMappingURL=login.js.map