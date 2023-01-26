export class NotAuthenticate extends Error {
    constructor() {
        super('Token not valid.')
    }
}
