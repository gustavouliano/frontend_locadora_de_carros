import { Car } from "./Car";
import { Customer } from "./Customer";

export type Rental = {
    _id: string,
    customer_id: Customer,
    car_id: Car,
    start_date: string,
    end_date: string,
    daily_value: number
}

export type ApiGetRentals = {
    rentals: {
        _id: string,
        start_date: string,
        end_date: string,
        daily_value: number
        customer: {
            _id: string,
            name: string
        },
        car: {
            _id: string,
            plate: string
        }
    }[]
};

export type RentalTable = {
    _id: string,
    start_date: string,
    end_date: string,
    daily_value: number,
    customer: {
        _id: string,
        name: string
    },
    car: {
        _id: string,
        plate: string
    }
}

export type ApiGetRental = Rental;

export type ApiNewRental = {
    rental: Rental
}
