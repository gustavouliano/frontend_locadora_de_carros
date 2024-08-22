import { ApiDeleteUser, ApiGetUser, ApiSignIn, ApiSignUp, ApiUpdateUser } from "../@types/Auth";
import { ApiGetCars, ApiNewCar } from "../@types/Car";
import { ApiGetCarModels, ApiNewCarModel } from "../@types/CarModel";
import { ApiGetCustomers, ApiNewCustomer } from "../@types/Customer";
import { ApiGetRentals, ApiNewRental } from "../@types/Rental";
import { ApiGetTransaction, ApiGetTransactions, ApiNewTransaction, ApiUpdateTransaction, TransactionStatus } from "../@types/Transaction";
import { api } from "./api"

export const getBusinessApiUri = async () => {
    return await api<{ address: string }>({
        endpoint: 'business',
        method: 'GET',
        baseUrl: import.meta.env.VITE_API_SCHEDULER_URL
    })
}

export const getRentalsInfo = async () => {
    return await api<Blob>({
        endpoint: 'locacao/download',
        method: 'GET',
        responseType: 'blob'
    })
}

export const getRentals = async () => {
    return await api<ApiGetRentals>({
        endpoint: 'locacao'
    })
}

export const newRental = async (start_date: string, end_date: string, daily_value: number, customerId: string, carId: string) => {
    return await api<ApiNewRental>({
        endpoint: 'locacao',
        method: 'POST',
        data: { customer: customerId, car: carId, start_date, end_date, daily_value }
    });
}

export const getCarModels = async () => {
    return await api<ApiGetCarModels>({
        endpoint: 'carro-modelo'
    });
}

export const newCarModel = async (name: string, brand: string, airbag: boolean, abs: boolean) => {
    return await api<ApiNewCarModel>({
        endpoint: 'carro-modelo',
        method: 'POST',
        data: { name, brand, airbag, abs }
    });
}

export const getCars = async () => {
    return await api<ApiGetCars>({
        endpoint: 'carro'
    });
}

export const newCar = async (plate: string, km: number, carModelId: string) => {
    return await api<ApiNewCar>({
        endpoint: 'carro',
        method: 'POST',
        data: { plate, km, carModel: carModelId }
    });
}


export const getCustomers = async () => {
    return await api<ApiGetCustomers>({
        endpoint: 'cliente'
    });
}

export const newCustomer = async (name: string) => {
    return await api<ApiNewCustomer>({
        endpoint: 'cliente',
        method: 'POST',
        data: { name }
    });
}

// Auth
export const signUp = async (name: string, email: string, password: string) => {
    return await api<ApiSignUp>({
        endpoint: 'auth/signup',
        method: 'POST',
        data: { name, email, password },
        withAuth: false
    });
}

export const signIn = async (email: string, password: string) => {
    return await api<ApiSignIn>({
        endpoint: 'auth/signin',
        method: 'POST',
        data: { email, password },
        withAuth: false
    });
}

// User
export const getUser = async () => {
    return await api<ApiGetUser>({
        endpoint: 'auth/me',
    });
}

export const updateUser = async (name: string, email: string) => {
    return await api<ApiUpdateUser>({
        endpoint: 'users',
        method: 'PUT',
        data: { name, email }
    });
}

export const deleteUser = async () => {
    return await api<ApiDeleteUser>({
        endpoint: 'users',
        method: 'DELETE',
    });
}

// Transactions
export const getTransactions = async (page: number) => {
    return await api<ApiGetTransactions>({
        endpoint: 'transactions',
        data: { page }
    });
}

export const getTransaction = async (id: number) => {
    return await api<ApiGetTransaction>({
        endpoint: `transactions/${id}`
    });
}

export const newTransaction = async (title: string, amount: number, status?: TransactionStatus) => {
    return await api<ApiNewTransaction>({
        endpoint: 'transactions',
        method: 'POST',
        data: { title, amount, status }
    });
}

export const updateTransaction = async (id: number, title: string, amount: number, status: TransactionStatus) => {
    return await api<ApiUpdateTransaction>({
        endpoint: `transactions/${id}`,
        method: 'PUT',
        data: { title, amount, status }
    });
}

export const deleteTransaction = async (id: number) => {
    return await api<ApiUpdateTransaction>({
        endpoint: `transactions/${id}`,
        method: 'DELETE'
    });
}

// Dashboard
// export const getDashboard = async (month: string, year: string) => {
//     const response = await api<ApiGetDashboard>({
//         endpoint: 'dashboard'
//     });
//     let balance = 0;
//     let pending_transactions = response.data?.pending_transactions ?? 0;
//     let completed_transactions = response.data?.completed_transactions ?? 0;

//     if (response.data) {
//         response.data.transactions.map(transaction => {
//             const date = formatDate(transaction.created_at).split('/');
//             if (date[1] == month && date[2] == year) {
//                 balance += transaction.amount;
//             }
//         })
//     }
//     return { balance, pending_transactions, completed_transactions }
// }