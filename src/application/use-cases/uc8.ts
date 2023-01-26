import { AuthRepository } from "../repositories/auth-repository";
import { ParkingRepository } from "../repositories/parking-repository";
import { NotAuthenticate } from "./erros/auth";
import { CarNotExists } from "./erros/check-exists";
import { DifferentAmount, DifferentValueToPay } from "./erros/different";

interface UC8Request {
    license_plate: string;
    amount_paid: number;
    token: string | null;
}

type UC8Response = number

export class UseCase8 {
    constructor (private parkingRepository: ParkingRepository, private authRepositoty: AuthRepository) {}

    async execute(request: UC8Request): Promise<UC8Response> {
        const { license_plate, amount_paid, token } = request

        const checkToken = await this.authRepositoty.ensureAuthenticate('Bearer '+token || '')
        if(!checkToken){
            throw new NotAuthenticate()
        }

        const parkingAlreadExists = await this.parkingRepository.findByLicencePlate(license_plate);
    
        if (!parkingAlreadExists) {
            throw new CarNotExists()
        }

        if(
            parkingAlreadExists.value_to_pay === 0 || 
            parkingAlreadExists.value_to_pay === null || 
            parkingAlreadExists.value_to_pay === undefined 
        ){
            throw new DifferentValueToPay()
        }

        if(parkingAlreadExists.value_to_pay > amount_paid ){
            throw new DifferentAmount()
        }

        parkingAlreadExists.amount_paid = amount_paid
        let calculated_parking = await this.parkingRepository.payment(parkingAlreadExists)

        return calculated_parking.discount || 0
    }
}