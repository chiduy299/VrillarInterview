import App from './app';
import { Route } from './core/interfaces';
import CrawlerRoute from './protocol/http/route/crawler';

const routes: Route[] = [
    new CrawlerRoute()
];


const app = new App(routes);

app.listen();

export default {};