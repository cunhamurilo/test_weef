import { User } from "../entities/user";

export abstract class AuthRepository {
    abstract execute(user:User): Promise<{ token: string; }>;
    abstract ensureAuthenticate(token:string): Promise<boolean>;
}