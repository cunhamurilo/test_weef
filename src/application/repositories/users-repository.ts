import { User } from "../entities/user";

export abstract class UsersRepository {
    abstract create(user:User): Promise<User>;
    abstract findById(userId: number): Promise<User | null>;
    abstract findByUsername(username: string): Promise<User | null>;
    abstract findMany(): Promise<User[]>;
    abstract save(user:User): Promise<void>;
    abstract delete(userId: number): Promise<void>;
}