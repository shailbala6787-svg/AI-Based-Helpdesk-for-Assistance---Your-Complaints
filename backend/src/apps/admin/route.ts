import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.js';
import { adminOnly } from '../../middleware/adminOnly.js';
import { searchUsersController } from './controllers/searchUsers.js';
import { updateLimitsController } from './controllers/updateLimits.js';

export const adminRouter = Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminOnly);

adminRouter.get('/users', searchUsersController);
adminRouter.patch('/users/:id/limits', updateLimitsController);
