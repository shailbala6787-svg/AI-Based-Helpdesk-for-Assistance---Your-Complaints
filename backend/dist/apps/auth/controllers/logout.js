import { success } from '../../../utils/envelope.js';
export function logoutController(_req, res) {
    res.clearCookie('authorization', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    success(res, 'Logged out successfully');
}
//# sourceMappingURL=logout.js.map