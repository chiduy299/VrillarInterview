import App from './app';
import { Route } from './core/interfaces';

const routes: Route[] = [];


const app = new App(routes);

app.listen();

export default {};