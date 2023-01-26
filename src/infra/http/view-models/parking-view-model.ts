import { Parking } from "@application/entities/parking";

export class ParkingViewModel {
    // formata para mostrar pro usuário
    static toHTTPEntry(parking: Parking) {
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
}