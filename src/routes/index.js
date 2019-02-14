import mainLocationRoutes from './mainLocation';
import subLocationRoutes from './subLocation';

const routes = (app) => {
  mainLocationRoutes(app);
  subLocationRoutes(app);
};

export default routes;
