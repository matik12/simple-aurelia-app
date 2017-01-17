import { autoinject, observable, bindable, customElement } from 'aurelia-framework';

@customElement('currency-converter')
@autoinject()
export class CurrencyConverter {

    @bindable rates: Rate[] = [];

    @observable({ changeHandler: 'fromChanged' }) fromCurrency;
    fromAmount: string;

    @observable({ changeHandler: 'toChanged' }) toCurrency;
    toAmount: string;

    constructor(private element: Element) { }

    ratesChanged() {
        if (this.rates.length >= 2) {
            this.fromCurrency = this.rates[0];
            this.toCurrency = this.rates[1];
        }

        this.rates.forEach(r => {
            r.mid = +this.toFixedValue(r.mid);
        });
     }

    fromChanged() {
        if (!this.fromAmount) {
            return;
        }

        const newAmount = +this.fromAmount * (this.fromCurrency.mid / this.toCurrency.mid);
        this.toAmount = this.toFixedValue(newAmount);
    }

    toChanged() {
        if (!this.toAmount) {
            return;
        }

        const newAmount = +this.toAmount * (this.toCurrency.mid / this.fromCurrency.mid);
        this.fromAmount = this.toFixedValue(newAmount);
    }

    switchCurrencies() {
        const oldFromCurrency = this.fromCurrency;
        const oldFromAmmount = this.fromAmount;

        this.fromCurrency = this.toCurrency;
        this.toCurrency = oldFromCurrency;

        this.fromAmount = oldFromAmmount;
        this.fromChanged();
    }

    private toFixedValue(value: number): string {
        return (+value.toFixed(2)).toString();
    }
}