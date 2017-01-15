import { Home } from 'src/home';
import ExchangeRateService from 'src/services/exchange-rate-service';
import { Router } from 'aurelia-router';

describe('Home page', () => {
    let home: Home;
    let exchangeRateService: ExchangeRateService;
    let router: Router;

    beforeEach(() => {
        exchangeRateService = jasmine.createSpyObj('ExchangeRateService', ['getCurrentExchangeRates']);
        router = jasmine.createSpyObj('Router', ['navigateToRoute']);

        home = new Home(exchangeRateService, router);
    });

    it('should set all 4 supported currency rates: PLN, USD, GBP, EUR', (done) => {
        // act
        const hasPLNCurrency = home.currencyRates.find(r => r.code === 'PLN');
        const hasUSDCurrency = home.currencyRates.find(r => r.code === 'USD');
        const hasGBPCurrency = home.currencyRates.find(r => r.code === 'GBP');
        const hasEURCurrency = home.currencyRates.find(r => r.code === 'EUR');

        // assert
        expect(home.currencyRates.length).toBe(4);
        expect(hasPLNCurrency).toBeDefined();
        expect(hasUSDCurrency).toBeDefined();
        expect(hasGBPCurrency).toBeDefined();
        expect(hasEURCurrency).toBeDefined();
        done();
    });

    it('should call exchange rate service when page activate invoked', (done) => {
        // arrange
        (<jasmine.Spy>exchangeRateService.getCurrentExchangeRates).and.callFake(() => {
            return new Promise(resolve => {
                resolve({});
            });
        });

        // act
        home.activate().then(result => {

            // assert
            expect(exchangeRateService.getCurrentExchangeRates).toHaveBeenCalled();
            done();
        });
    });

    it('should navigate to error route when page activate invoked and promise was rejected', (done) => {
        // arrange
        const errorRoute = 'unexpected-error';
        (<jasmine.Spy>exchangeRateService.getCurrentExchangeRates).and.callFake(() => {
            return new Promise((resolve, reject) => {
                reject({});
            });
        });

        // act
        home.activate().then(result => {

            // assert
            expect(router.navigateToRoute).toHaveBeenCalledWith(errorRoute);
            done();
        });
    });
});