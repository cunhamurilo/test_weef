import { Parking } from "@application/entities/parking"
import { ParkingRepository } from "@application/repositories/parking-repository"

export class InMemoryParkingRepository implements ParkingRepository {
    public parking: Parking[] = []

    async entry(parking: Parking): Promise<Parking> {
        this.parking.push(parking)
        return parking
    }

    async exit(parking: Parking): Promise<Parking> {
        if(
            parking.exit_time !== null && parking.exit_time !== undefined && 
            parking.entry_time !== null && parking.entry_time !== undefined
        ){
            let difference = parking.exit_time.getTime() - parking.entry_time.getTime();
            parking.time_parked_in_minutes  = Math.round(difference / 60000);
        }
        return parking
    }

    async payment(parking: Parking): Promise<Parking> {
        parking.discount = 0
        if(
            parking.amount_paid !== null && parking.amount_paid !== undefined && 
            parking.value_to_pay !== null && parking.value_to_pay !== undefined
        ){
            parking.discount = parking.amount_paid - parking.value_to_pay
        }
        return parking
    }

    async calculate_value(parking: Parking): Promise<Parking> {
        if( parking.entry_time !== null && parking.entry_time !== undefined){
            let difference = new Date().getTime() - parking.entry_time.getTime();
            let time_parked_in_minutes = Math.round(difference / 60000);
            if(time_parked_in_minutes < 10)
                parking.value_to_pay = 0
            else if(time_parked_in_minutes >= 10 && time_parked_in_minutes <= 60 )
                parking.value_to_pay = 20
            else {
                if(time_parked_in_minutes % 2 === 0)
                    parking.value_to_pay = 60 * 20 * ((time_parked_in_minutes-60) / 2)
                else
                    parking.value_to_pay = 60 * 20
            }
        }

        return parking
    }

    async findByLicencePlate(license_plate: string): Promise<Parking | null> {
        const park = this.parking.find((item) => item.license_plate === license_plate)

        if(park === undefined)
            return null
        
        return park
    }
    
    
}