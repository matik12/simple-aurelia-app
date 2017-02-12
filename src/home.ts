import { autoinject } from 'aurelia-framework';
import { RedirectToRoute } from 'aurelia-router';

import ExchangeRateService from './services/exchange-rate-service';

@autoinject
export class Home {

    currencyRates: Rate[] = [
        {
            code: 'PLN',
            currency: 'Polish Zloty',
            mid: 1
        },
        {
            code: 'USD',
            currency: 'US Dollar'
            // i.e. mid: 4.0302
        },
        {
            code: 'GBP',
            currency: 'British Pound'
        },
        {
            code: 'EUR',
            currency: 'Euro'
        }
    ];

    constructor(private exchangeRateService: ExchangeRateService) { }

    activate() {
        // Aurelia best practise: use activate to get required data for particular view and 
        // always return promise to tell aurelia router to wait until data arrives 
        return this.exchangeRateService.getCurrentExchangeRates()
            .then(rateTable => this.mapCurrentRateValues(rateTable.rates))
            .catch(() => Promise.reject(new RedirectToRoute('unexpected-error')));
    }

    private mapCurrentRateValues(rates: Rate[]) {
        this.currencyRates.forEach(rate => {
            const actualRate = rates.find(r => r.code === rate.code);

            if (actualRate) {
                rate.mid = actualRate.mid;
            }
        });
    }
}