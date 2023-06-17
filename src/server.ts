import App from './app';
import { Route } from './core/interfaces';
import { CrawlerRoute, RaceRoute } from './protocol/http/route';

const routes: Route[] = [
    new CrawlerRoute(),
    new RaceRoute()
];

const app = new App(routes);

app.listen();

export default {};