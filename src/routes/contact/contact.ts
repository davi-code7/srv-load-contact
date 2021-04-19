import { Router } from 'express';

import { getContact } from '../../controllers/contact/contact';

const router = Router();

router.post('', getContact);

export default router;
