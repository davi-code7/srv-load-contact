import { Router } from 'express';
import OrchyBase from 'orchy-base-code7';

import { contact } from '@controllers/contact/contact';

const router = Router();

router.post('', contact);

export default router;
