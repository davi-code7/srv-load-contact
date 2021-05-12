import { Router } from 'express';

import { status } from '../../controllers/status/index';

const router = Router();

router.get('', status);

export default router;
