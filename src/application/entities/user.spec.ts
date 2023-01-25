import { User } from "./user"

describe('User', () => {
    it('should be able to create a user', () => {
        const user = new User({
            username: 'murilo@teste.com',
            password: '12345',
        })
    
        expect(user).toBeTruthy()
    })
})