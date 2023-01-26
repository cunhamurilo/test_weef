import { User as RawUser } from '@prisma/client'
import { User } from "../../../application/entities/user";

export class PrismaUserMapper {
    
    // formata os dados para inserir no prisma 
    static toPrisma(user: User){
        return {
            id: user.id,
            password: user.password,
            username: user.username,
            updated_at: user.updated_at,
            created_at: user.created_at,
        }
    }

    // formata os dados depois de obtido do prisma 
    static toDomain(raw: RawUser): User {
        return new User({
            username: raw.username,
            password: raw.password,
            updated_at: raw.updated_at,
            created_at: raw.created_at,
        }, raw.id)
    }
}