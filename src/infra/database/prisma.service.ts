import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
  
async function onInit() {
    await prisma.$connect();
}
 
onInit().then(() => {
    console.log('Connect database')
})

