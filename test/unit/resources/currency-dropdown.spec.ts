import { CurrencyDropdown } from 'src/resources/elements/currency-dropdown';

describe('Currency Dropdown element', () => {
    let currencyDropdown: CurrencyDropdown;
    const rates = [
        { code: 'code1', currency: 'curr 1', mid: 1 },
        { code: 'code2', currency: 'curr 2', mid: 2 }
    ];

    beforeEach(() => {
        currencyDropdown = new CurrencyDropdown(null);
    });

    it('should set selected item when currencies has been binded and element attached invoked', (done) => {
        // arrange
        currencyDropdown.currencies = rates;

        // act
        currencyDropdown.attached();

        // assert
        expect(currencyDropdown.selected).toBeDefined();
        expect(currencyDropdown.selected).toBe(rates[0]);
        done();
    });
});