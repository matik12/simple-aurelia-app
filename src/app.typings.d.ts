interface RateTable {
    table: string;
    effectiveDate: string;
    no: string;
    rates: Rate[];
}

interface Rate {
    code: string;
    currency: string;
    mid?: number;
}

interface Currency {
    code: string;
    currency: string;
}