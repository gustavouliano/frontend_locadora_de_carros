
export type Customer = {
    _id: string,
    name: string,
}

export type ApiGetCustomers = {
    customers: Customer[];
};


export type ApiGetCustomer = {
    customer: Customer
};

export type ApiNewCustomer = {
    customer: Customer
}
