import { User } from "../../../application/entities/user";
import { sign } from "jsonwebtoken";

interface IAuthRequest {
  user: User
}

class AuthRepository {
  
  constructor() {}

  // função que obtem o token de autenticação
  async execute( { user }: IAuthRequest) {

    // Gerar token
    const token = sign(
      {
        id: user.id,
      },
        process.env.NODE_SECRET || "",
      {
        subject: user.id+'',
        expiresIn: "60s",
      }
    );

    return {token:token};
  }
}

export { AuthRepository };