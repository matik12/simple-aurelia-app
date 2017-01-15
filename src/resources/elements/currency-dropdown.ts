import { autoinject, bindable, customElement } from 'aurelia-framework';
import 'bootstrap-sass';

// This custom element is not generic, it's only for currency selection control
// Simple implementation is just an example of possible options
@customElement('currency-dropdown')
@autoinject()
export class CurrencyDropdown {

    @bindable currencies: Currency[] = [];
    @bindable selected: Currency;

    constructor(private element: Element) { }

    attached() {
        if (!this.selected && this.currencies.length > 0) {
            this.selected = this.currencies[0];
        }
    }
}