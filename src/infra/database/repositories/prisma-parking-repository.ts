import { Parking } from "@application/entities/parking";
import { ParkingRepository } from "@application/repositories/parking-repository";
import { PrismaClient } from '@prisma/client'
import { PrismaParkingMapper } from "../mappers/prisma-parking-mapper";

export class PrismaParkingRepository implements ParkingRepository {

    constructor(private prisma: PrismaClient) {}
    
    // função que obtem o veiculo pela placa
    async findByLicencePlate(license_plate: string): Promise<Parking | null>{
        const parking = await this.prisma.parking.findFirst({
            where: {
                license_plate: license_plate
            }
        })

        if(!parking){
            return null
        }

        return PrismaParkingMapper.toDomain(parking)
    }

    // função que faz a entrada no veiculo no estacionamento
    async entry(parking:Parking): Promise<Parking> {
        const raw = PrismaParkingMapper.toPrisma(parking)
        
        let entry = await this.prisma.parking.create({
            data: raw
        })

        return PrismaParkingMapper.toDomain(entry)
    }

    // função que faz a saida no veiculo no estacionamento
    async exit(parking: Parking): Promise<Parking> {
        const raw = PrismaParkingMapper.toPrisma(parking) 
        if(
            raw.exit_time !== null && raw.exit_time !== undefined && 
            raw.entry_time !== null && raw.entry_time !== undefined
        ){
            let difference = raw.exit_time.getTime() - raw.entry_time.getTime();
            raw.time_parked_in_minutes  = Math.round(difference / 60000);
        }
        
        let entry = await this.prisma.parking.update({
            where: {
                id: raw.id
            },
            data: raw
        })
        return PrismaParkingMapper.toDomain(entry)
    }

    // função que faz o pagamento do veiculo no estacionamento
    async payment(parking: Parking): Promise<Parking> {
        const raw = PrismaParkingMapper.toPrisma(parking) 
        
        if(
            raw.amount_paid !== null && raw.amount_paid !== undefined && 
            raw.value_to_pay !== null && raw.value_to_pay !== undefined
        ){
            raw.discount = raw.amount_paid - raw.value_to_pay
        }

        let entry = await this.prisma.parking.update({
            where: {
                id: raw.id
            },
            data: raw
        })
        return PrismaParkingMapper.toDomain(entry)
    }

    // função que calcula o valor do estacionamento de um veiculo
    async calculate_value(parking: Parking): Promise<Parking> {
        const raw = PrismaParkingMapper.toPrisma(parking)
        if(
            raw.entry_time !== null && raw.entry_time !== undefined
        ){
            let difference = new Date().getTime() - raw.entry_time.getTime();
            let time_parked_in_minutes = Math.round(difference / 60000);
            if(time_parked_in_minutes < 10)
                raw.value_to_pay = 0
            else if(time_parked_in_minutes >= 10 && time_parked_in_minutes <= 60 )
                raw.value_to_pay = 20
            else {
                if(time_parked_in_minutes % 2 === 0)
                    raw.value_to_pay = 60 * 20 * ((time_parked_in_minutes-60) / 2)
                else
                    raw.value_to_pay = 60 * 20
            }
        }
        
        let entry = await this.prisma.parking.update({
            where: {
                id: raw.id
            },
            data: raw
        })
        return PrismaParkingMapper.toDomain(entry)
    }
}