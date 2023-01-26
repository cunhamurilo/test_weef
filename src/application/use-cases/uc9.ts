import { AuthRepository } from "../repositories/auth-repository";
import { ParkingRepository } from "../repositories/parking-repository";
import { NotAuthenticate } from "./erros/auth";
import { CarNotExists } from "./erros/check-exists";

interface UC9Request {
    license_plate: string;
    token: string | null;
}

type UC9Response = number

export class UseCase9 {
    constructor (private parkingRepository: ParkingRepository, private authRepositoty: AuthRepository) {}

    async execute(request: UC9Request): Promise<UC9Response> {
        const { license_plate, token } = request

        const checkToken = await this.authRepositoty.ensureAuthenticate('Bearer '+token || '')
        if(!checkToken){
            throw new NotAuthenticate()
        }

        const parkingAlreadExists = await this.parkingRepository.findByLicencePlate(license_plate);
    
        if (!parkingAlreadExists) {
            throw new CarNotExists()
        }

        let calculated_parking = await this.parkingRepository.calculate_value(parkingAlreadExists)

        return calculated_parking.value_to_pay || 0
        
    }
}