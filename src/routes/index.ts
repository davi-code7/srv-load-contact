import contact from './contact/contact';
import status from './status';

export default (app) => {
  app.use('/contact', contact);
  app.use('/status', status);
};
