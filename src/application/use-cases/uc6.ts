import { Parking } from "../entities/parking";
import { AuthRepository } from "../repositories/auth-repository";
import { ParkingRepository } from "../repositories/parking-repository";
import { NotAuthenticate } from "./erros/auth";
import { CarExists } from "./erros/check-exists";

interface UC6Request {
    license_plate: string;
    token: string | null;
}

interface UC6Response {
    parking: Parking;
}

export class UseCase6 {
    constructor (private parkingRepository: ParkingRepository, private authRepositoty: AuthRepository) {}

    async execute(request: UC6Request): Promise<UC6Response> {
        const { license_plate, token } = request

        const checkToken = await this.authRepositoty.ensureAuthenticate('Bearer '+token || '')
        if(!checkToken){
            throw new NotAuthenticate()
        }

        const parkingAlreadExists = await this.parkingRepository.findByLicencePlate(license_plate);
    
        if (parkingAlreadExists) {
            throw new CarExists()
        }

        const parking = new Parking({
            license_plate,
            entry_time: new Date()
        })

        await this.parkingRepository.entry(parking)

        return {
            parking,
        }

    }
}