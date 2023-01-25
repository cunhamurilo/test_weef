import { Replace } from "@helpers/Replace";

export interface UserProps {
    username: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export class User {
    private props: UserProps;
    private _id: number;

    constructor(props: Replace<UserProps, {created_at?: Date, updated_at?: Date}>, 
        id?: number
    ) {
        this._id = id ?? 0
        this.props = {
            ...props,
            created_at: props.created_at ?? new Date(),
            updated_at: props.updated_at ?? new Date(),
        }
    }

    public get id(): number {
        return this._id
    }

    public set username (username: string) {
        this.props.username = username
    }   

    public get username(): string {
        return this.props.username
    }  

    public set password (password: string) {
        this.props.password = password
    }   

    public get password(): string {
        return this.props.password || ''
    }  

    public set updated_at (updated_at: Date) {
        this.props.updated_at = updated_at
    }   

    public get updated_at(): Date {
        return this.props.updated_at
    }   

    public get created_at(): Date {
        return this.props.created_at
    }        
}