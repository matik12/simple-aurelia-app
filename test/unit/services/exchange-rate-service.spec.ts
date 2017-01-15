import ExchangeRateService from 'src/services/exchange-rate-service';
import { HttpClient } from 'aurelia-fetch-client';

describe('Exchange Rate service', () => {
    let exchangeRateService: ExchangeRateService;
    let httpClient: HttpClient;
    const items = [
        <RateTable>{
            table: 'fake table',
            effectiveDate: 'date',
            no: 'no',
            rates: [
                { code: 'code1', currency: 'curr 1', mid: 1 },
                { code: 'code2', currency: 'curr 2', mid: 2 }
            ]
        }
    ];

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['configure', 'fetch']);
    });

    it('should invoke configure and set base url to nbp api', (done) => {
        // arrange
        const baseApiUrl = 'http://api.nbp.pl/api/';
        const httpConfig = jasmine.createSpyObj('HttpClientConfiguration', ['useStandardConfiguration', 'withBaseUrl']);
        (<jasmine.Spy>httpClient.configure).and.callFake((configCallback) => {
            configCallback(httpConfig);
        });
        (<jasmine.Spy>httpConfig.useStandardConfiguration).and.callFake(() => httpConfig);

        // act
        exchangeRateService = new ExchangeRateService(httpClient);

        // assert
        expect(httpClient.configure).toHaveBeenCalledTimes(1);
        expect(httpConfig.withBaseUrl).toHaveBeenCalledWith(baseApiUrl);
        done();
    });

    it('should return response rate table when getCurrentExchangeRates called', (done) => {
        // arrange
        (<jasmine.Spy>httpClient.fetch).and.callFake(() => {
            return new Promise(resolve => {
                resolve({ json: () => items });
            });
        });
        exchangeRateService = new ExchangeRateService(httpClient);

        // act
        exchangeRateService.getCurrentExchangeRates().then(result => {

            // assert
            expect(result).toBeDefined();
            expect(result.rates.length).toBe(items[0].rates.length);
            done();
        });
    });
});