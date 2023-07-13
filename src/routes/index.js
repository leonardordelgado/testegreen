import bodyParser from 'body-parser';
import BoletosRouter from './BoletosRouter.js';

const routes = (App) => {
  App.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    BoletosRouter,
  );
};

export default routes;
