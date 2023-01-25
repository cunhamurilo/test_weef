import { Parking } from "../entities/parking";

export abstract class ParkingRepository {
    abstract entry(parking:Parking): Promise<Parking>;
    abstract exit(parking: Parking): Promise<Parking>;
    abstract payment(parking: Parking): Promise<Parking>;
    abstract calculate_value(parking: Parking): Promise<Parking>;
    abstract findByLicencePlate(license_plate: string): Promise<Parking | null>;
}