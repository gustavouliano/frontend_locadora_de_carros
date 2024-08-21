
export type CarModel = {
    _id: string,
    name: string,
    brand: string,
    airbag: boolean,
    abs: boolean
}

export type ApiGetCarModels = {
    carModels: CarModel[]
};

export type ApiGetCarModel = CarModel;

export type ApiNewCarModel = {
    carModel: CarModel
}
