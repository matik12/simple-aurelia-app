import { CurrencyConverter } from 'src/resources/elements/currency-converter';

describe('Currency Converter element', () => {
    let currencyConverter: CurrencyConverter;
    const rates = [
        { code: 'code1', currency: 'curr 1', mid: 1 },
        { code: 'code2', currency: 'curr 2', mid: 2 }
    ];

    beforeEach(() => {
        currencyConverter = new CurrencyConverter(null);
    });

    it('should set from and to currency initial values on rates binded when ratesChanged invoked', (done) => {
        // arrange
        currencyConverter.rates = rates;

        // act
        currencyConverter.ratesChanged();

        // assert
        expect(currencyConverter.fromCurrency).toBeDefined();
        expect(currencyConverter.fromCurrency).toBe(rates[0]);
        expect(currencyConverter.toCurrency).toBeDefined();
        expect(currencyConverter.toCurrency).toBe(rates[1]);
        done();
    });

    it('should initial from and to values be undefined when ratesChanged not invoked by binding', (done) => {
        // act
        currencyConverter.ratesChanged();

        // assert
        expect(currencyConverter.fromCurrency).toBeUndefined();
        expect(currencyConverter.toCurrency).toBeUndefined();
        done();
    });

    it('should not change toAmount when fromChanged invoked but fromAmount is an empty value', (done) => {
        // arrange
        const fakeAmount = '100';
        currencyConverter.rates = rates;
        currencyConverter.fromAmount = '';
        currencyConverter.toAmount = fakeAmount;

        // act
        currencyConverter.fromChanged();

        // assert
        expect(currencyConverter.toAmount).toBe(fakeAmount);
        done();
    });

    it('should calculate proper toAmount when fromChanged invoked and fromAmount is provided', (done) => {
        // arrange
        const fakeFromAmount = 100;
        const expectedToAmount = 50;
        currencyConverter.rates = rates;
        currencyConverter.fromCurrency = rates[0];
        currencyConverter.fromAmount = fakeFromAmount.toString();
        currencyConverter.toCurrency = rates[1];
        currencyConverter.toAmount = undefined;

        // act
        currencyConverter.fromChanged();

        // assert
        expect(currencyConverter.toAmount).toBe(expectedToAmount.toString());
        done();
    });

    it('should not change fromAmount when toChanged invoked but toAmount is an empty value', (done) => {
        // arrange
        const fakeAmount = '100';
        currencyConverter.rates = rates;
        currencyConverter.toAmount = '';
        currencyConverter.fromAmount = fakeAmount;

        // act
        currencyConverter.toChanged();

        // assert
        expect(currencyConverter.fromAmount).toBe(fakeAmount);
        done();
    });

    it('should calculate proper fromAmount when toChanged invoked and toAmount is provided', (done) => {
        // arrange
        const fakeToAmount = 100;
        const expectedFromAmount = 200;
        currencyConverter.rates = rates;
        currencyConverter.fromCurrency = rates[0];
        currencyConverter.fromAmount = undefined;
        currencyConverter.toCurrency = rates[1];
        currencyConverter.toAmount = fakeToAmount.toString();

        // act
        currencyConverter.toChanged();

        // assert
        expect(currencyConverter.fromAmount).toBe(expectedFromAmount.toString());
        done();
    });
});