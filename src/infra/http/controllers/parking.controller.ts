import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaParkingRepository } from "../../database/repositories/prisma-parking-repository";
import { Parking } from "@application/entities/parking";
import { PrismaParkingMapper } from "../../database/mappers/prisma-parking-mapper";

const prisma = new PrismaClient()

class ParkingController {

  // controlador que verifica se um veiculo já está estacionado 
  // para colocar a entrada do veiculo
  async entry(request: Request, response: Response) {
    const { license_plate, entry_time } = request.body;

    const parkingService = new PrismaParkingRepository(prisma);

    const parkingAlreadyExist = await parkingService.findByLicencePlate(license_plate)

    if(parkingAlreadyExist){
      return response.status(200).json({ status: "Veículo já estacionado" })
    }

    const parking = await parkingService.entry({license_plate, entry_time: new Date(entry_time)} as Parking)
    
    return response.status(201).json(parking); 
  }

  // controlador que verifica se um veiculo já está estacionado,
  // verifica se foi realizado um pagamento do veiculo,
  // verifica se o veiculo ja saiu do estacionamento
  // para dar a saida do veiculo
  async exit(request: Request, response: Response){
    const { license_plate, exit_time } = request.body;

    const parkingService = new PrismaParkingRepository(prisma);

    const parkingAlreadyExist = await parkingService.findByLicencePlate(license_plate)

    if(!parkingAlreadyExist){
      return response.status(200).json({ status: "Veículo não estacionado" })
    }

    if(parkingAlreadyExist.amount_paid === null || parkingAlreadyExist.amount_paid === undefined){
      return response.status(400).json({ status: "Veículo sem pagamento" })
    }

    if(parkingAlreadyExist.exit_time !== null && parkingAlreadyExist.exit_time !== undefined){
      return response.status(400).json({ status: "Veículo já saiu do estacionamento" })
    }

    parkingAlreadyExist.exit_time = new Date(exit_time)

    const parking = await parkingService.exit(
      parkingAlreadyExist
    )
    
    return response.status(200).json(parking); 
  }

  // controlador que verifica se um veiculo já está estacionado,
  // verifica se já consultou o valor a pagar,
  // verifica se já efetuou um pagamento anterior e
  // verifica se o valor pago é menor que o cobrado
  async payment(request: Request, response: Response){
    const { license_plate, amount_paid } = request.body;

    const parkingService = new PrismaParkingRepository(prisma);

    const parkingAlreadyExist = await parkingService.findByLicencePlate(license_plate)

    if(!parkingAlreadyExist){
      return response.status(200).json({ status: "Veículo não estacionado" })
    }

    if(parkingAlreadyExist.value_to_pay === null || parkingAlreadyExist.value_to_pay === undefined){
      return response.status(400).json({ status: "Consultar valor a pagar do estacionamento" })
    }

    if(parkingAlreadyExist.amount_paid !== null && parkingAlreadyExist.amount_paid !== undefined){
      return response.status(400).json({ status: "Veículo já efetuou o pagamento do estacionamento" })
    }

    if(parseFloat(amount_paid) < parkingAlreadyExist.value_to_pay) {
      return response.status(400).json({ status: "Valor a pagar é menor que o cobrado" })
    }

    parkingAlreadyExist.amount_paid = parseFloat(amount_paid)

    const parking = await parkingService.payment(
      parkingAlreadyExist
    )

    return response.status(200).json(parking)
  }

  // controlador que verifica se um veiculo não está estacionado
  // para calcular o valor do estacionamento
  async calculate_value(request: Request, response: Response){
    const { license_plate } = request.params;

    const parkingService = new PrismaParkingRepository(prisma);

    const parkingAlreadyExist = await parkingService.findByLicencePlate(license_plate)

    if(!parkingAlreadyExist){
      return response.status(200).json({ status: "Veículo não estacionado" })
    }

    const parking = await parkingService.calculate_value(
      parkingAlreadyExist
    )

    return response.status(200).json(parking)
  }

}

export { ParkingController };