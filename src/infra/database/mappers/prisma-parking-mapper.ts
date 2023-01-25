import { Parking as RawParking } from '@prisma/client'
import { Parking } from "../../../application/entities/parking";

export class PrismaParkingMapper {
    static toPrisma(parking: Parking){
        return {
            id: parking.id,
            license_plate: parking.license_plate,
            entry_time: parking.entry_time,
            exit_time: parking.exit_time,
            time_parked_in_minutes: parking.time_parked_in_minutes,
            value_to_pay: parking.value_to_pay,
            amount_paid: parking.amount_paid,
            discount: parking.discount,
            updated_at: parking.updated_at,
            created_at: parking.created_at,
        }
    }

    static toDomain(raw: RawParking): Parking {
        return new Parking({
            license_plate: raw.license_plate,
            entry_time: raw.entry_time,
            exit_time: raw.exit_time,
            time_parked_in_minutes: raw.time_parked_in_minutes,
            value_to_pay: raw.value_to_pay,
            amount_paid: raw.amount_paid,
            discount: raw.discount,
            created_at: raw.created_at,
            updated_at: raw.updated_at
        }, raw.id)
    }
}