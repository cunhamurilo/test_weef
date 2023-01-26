export class DifferentPassword extends Error {
    constructor() {
        super('Different Password.')
    }
}

export class DifferentAmount extends Error {
    constructor() {
        super('Different amount paid to value to pay.')
    }
}

export class DifferentValueToPay extends Error {
    constructor() {
        super('Different value to pay.')
    }
}

export class DifferentAmountPaid extends Error {
    constructor() {
        super('Different amount paid.')
    }
}