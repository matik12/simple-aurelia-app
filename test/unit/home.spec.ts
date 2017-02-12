import { Home } from 'src/home';
import ExchangeRateService from 'src/services/exchange-rate-service';

describe('Home page', () => {
    let home: Home;
    let exchangeRateService: ExchangeRateService;

    beforeEach(() => {
        exchangeRateService = jasmine.createSpyObj('ExchangeRateService', ['getCurrentExchangeRates']);

        home = new Home(exchangeRateService);
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
                resolve({ rates: [] });
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
        home.activate().catch((result: any) => {

            // assert
            expect(result.route).toBe(errorRoute);
            done();
        });
    });
});