import { User } from "@application/entities/user";

export class UserViewModel {
    static toHTTP(user: User) {
        return {
            id: user.id,
            username: user.username,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
    }
}