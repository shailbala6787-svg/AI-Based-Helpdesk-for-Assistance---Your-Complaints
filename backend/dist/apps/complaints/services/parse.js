import { usersDAL } from '../../../db/dal/users.js';
import { uploadImage } from '../../../utils/supabase.js';
import { parseComplaintImage } from '../../../utils/openai.js';
export async function parseService(userId, file) {
    const user = await usersDAL.findById(userId);
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    if (user.uploadsUsed >= user.uploadLimit) {
        throw { status: 403, message: `Upload limit reached (${user.uploadLimit}). Contact admin to increase your limit` };
    }
    const imageUrl = await uploadImage(file.buffer, file.originalname, file.mimetype);
    const base64 = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64}`;
    const parsed = await parseComplaintImage(dataUrl);
    await usersDAL.incrementUploadsUsed(userId);
    return {
        ...parsed,
        imageUrl,
    };
}
//# sourceMappingURL=parse.js.map