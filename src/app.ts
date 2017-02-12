import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Simple Aurelia App';
        config.map([
            { route: '', name: 'home', moduleId: 'home', title: 'Home' },
            {
                route: 'unexpected-error',
                name: 'unexpected-error',
                moduleId: 'templates/unexpected-error/unexpected-error',
                title: 'Unexpected error'
            }
        ]);

        this.router = router;
    }
}