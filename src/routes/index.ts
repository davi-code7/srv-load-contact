import { Application } from 'express';

import contact from './contact/contact';

export default (app: Application): void => {
  app.use('/contact', contact);
};
