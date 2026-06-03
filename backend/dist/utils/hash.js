import bcrypt from 'bcryptjs';
import { BCRYPT_COST } from '../constants/enums.js';
export async function hashValue(plain) {
    return bcrypt.hash(plain, BCRYPT_COST);
}
export async function compareValue(plain, hash) {
    return bcrypt.compare(plain, hash);
}
//# sourceMappingURL=hash.js.map