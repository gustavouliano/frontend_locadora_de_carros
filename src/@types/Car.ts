import { CarModel } from "./CarModel";

export type Car = {
    _id: string,
    plate: string,
    km: number,
    carModel: CarModel,
}

export type ApiGetCars = {
    cars: {
        _id: string,
        plate: string,
        km: number,
        carModel: {
            _id: string,
            name: string
        }
    }[]
};

export type CarTable = {
    _id: string,
    plate: string,
    km: number,
    carModel: {
        _id: string,
        name: string
    }
}

export type ApiGetCar = Car;

export type ApiNewCar = {
    car: Car
}
