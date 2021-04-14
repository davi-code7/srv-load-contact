import 'dotenv/config';
import express from 'express';

import middlewares from './middlewares/index';

import routes from '@routes/index';

const app = express();

middlewares(app);

routes(app);

export default app;
