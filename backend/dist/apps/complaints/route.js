import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.js';
import { parseUpload, parseController } from './controllers/parse.js';
import { createController } from './controllers/create.js';
import { listController } from './controllers/list.js';
import { getByIdController } from './controllers/getById.js';
import { updateController } from './controllers/update.js';
import { deleteController } from './controllers/delete.js';
import { searchController } from './controllers/search.js';
export const complaintsRouter = Router();
complaintsRouter.use(authMiddleware);
complaintsRouter.post('/parse', parseUpload, parseController);
complaintsRouter.post('/', createController);
complaintsRouter.get('/', listController);
complaintsRouter.get('/search', searchController);
complaintsRouter.get('/:id', getByIdController);
complaintsRouter.patch('/:id', updateController);
complaintsRouter.delete('/:id', deleteController);
//# sourceMappingURL=route.js.map