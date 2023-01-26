import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
  
async function onInit() {
    await prisma.$connect();
}
 
// inicializa a coneção com o banco
onInit().then(() => {
    console.log('Connect database')
})

