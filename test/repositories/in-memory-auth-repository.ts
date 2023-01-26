import { User } from "@application/entities/user"
import { AuthRepository } from "@application/repositories/auth-repository"
import { sign, verify } from "jsonwebtoken";

export class InMemoryAuthRepository implements AuthRepository {
    public token: { token: string }
    private example_secret = 'testeweef'

    // função que imita a autenticação
    async execute(user: User): Promise<{ token: string; }> {
      
      // Gerar token
      const token = sign(
        {
          id: user.id,
        },
          this.example_secret,
        {
          subject: user.id+'',
          expiresIn: "120s",
        }
      );
    
      return {
        token
      };
    }

    // função que imita a verifica se o token é válido
    async ensureAuthenticate(authToken: string): Promise<boolean> {
      // Validar se token está preenchido
      if (authToken === '') {
        return false
      }

      const [, token] = authToken.split(" ");

      try {
        // Validar se token é válido
        verify(
          token,
          this.example_secret
        )
        return true
      } catch (err) {
        return false
      }
  }
}