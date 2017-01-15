import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';

import config from 'config/app.config.json!json';

@autoinject
export default class ExchangeRateService {

    constructor(private httpClient: HttpClient) {
        httpClient.configure(httpConfig => {
            httpConfig
                .useStandardConfiguration()
                .withBaseUrl(config.api.url);
        });
    }

    getCurrentExchangeRates() {
        return this.httpClient.fetch(config.api.resource.exchangeRates + 'A/')
            .then<any[]>(response => response.json())
            .then<RateTable>(response => response[0]);
    }
}