import { App } from 'src/app';

class RouterStub {
  routes;

  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('The App module', () => {
  let sut;
  let mockedRouter: any;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();

    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Simple Aurelia App');
  });

  it('should have default page set to home page', () => {
    expect(sut.router.routes).toContain({ route: '', name: 'home', moduleId: 'home', title: 'Home' });
  });
});