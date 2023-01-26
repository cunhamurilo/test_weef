import { Replace } from "@helpers/Replace";

export interface ParkingProps {
    license_plate: string;
    entry_time: Date;
    exit_time?: Date | null;
    time_parked_in_minutes?: number | null;
    value_to_pay?: number | null;
    amount_paid?: number | null;
    discount?: number | null;
    created_at: Date;
    updated_at: Date;
}

export class Parking {
    private props: ParkingProps;
    private _id: number;

    constructor(props: Replace<ParkingProps, {created_at?: Date, updated_at?: Date}>, 
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

    public set license_plate (license_plate: string) {
        this.props.license_plate = license_plate
    }   

    public get license_plate(): string {
        return this.props.license_plate
    }  

    public set time_parked_in_minutes (time_parked_in_minutes: number | null | undefined) {
        this.props.time_parked_in_minutes = time_parked_in_minutes
    }   

    public get time_parked_in_minutes(): number | null | undefined{
        return this.props.time_parked_in_minutes
    } 

    public set value_to_pay (value_to_pay: number | null | undefined) {
        this.props.value_to_pay = value_to_pay
    }   

    public get value_to_pay(): number | null | undefined {
        return this.props.value_to_pay
    }

    public set amount_paid (amount_paid: number | null | undefined) {
        this.props.amount_paid = amount_paid
    }   

    public get amount_paid(): number | null | undefined {
        return this.props.amount_paid
    }

    public set discount (discount: number | null | undefined) {
        this.props.discount = discount
    }   

    public get discount(): number | null | undefined {
        return this.props.discount
    }

    public set entry_time (entry_time: Date) {
        this.props.entry_time = entry_time
    }   

    public get entry_time(): Date {
        return this.props.entry_time
    }   

    public set exit_time (exit_time: Date | null | undefined) {
        this.props.exit_time = exit_time
    }   

    public get exit_time(): Date | null | undefined {
        return this.props.exit_time
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