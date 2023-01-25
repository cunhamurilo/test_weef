import { Parking } from "./parking"

describe('Parking', () => {
    it('should be able to create a parking', () => {
        const parking = new Parking({
            license_plate: 'ABC1234',
            entry_time: new Date(),
            exit_time: new Date(),
            time_parked_in_minutes: 3,
            value_to_pay: 3.4,
            amount_paid: 12.1,
            discount: 0.5,
        })
    
        expect(parking).toBeTruthy()
    })
})