export class UserExists extends Error {
    constructor() {
        super('User already exists.')
    }
}

export class UserNotExists extends Error {
    constructor() {
        super('User not exists.')
    }
}

export class CarNotExists extends Error {
    constructor() {
        super('Car not parking.')
    }
}

export class CarExists extends Error {
    constructor() {
        super('Car already parking.')
    }
}

export class UsernameExists extends Error {
    constructor() {
        super('Username already exists.')
    }
}