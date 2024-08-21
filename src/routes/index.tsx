import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import { NewTransaction } from "../pages/Transaction/New";
import { EditTransaction } from "../pages/Transaction/Edit";
import { Transactions } from "../pages/Transaction/Transactions";
import { NotFound } from "../pages/NotFound";
import { CarModels } from "../pages/CarModel/CarModels";
import { Cars } from "../pages/Car/Car";
import { NewCarModel } from "../pages/CarModel/New";
import { NewCar } from "../pages/Car/New";
import { Customers } from "../pages/Customer/Customers";
import { NewCustomer } from "../pages/Customer/New";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    index
                    element={<Home />}
                />
                <Route path="/carro-modelos">
                    <Route
                        index
                        element={<CarModels />}
                    />
                    <Route
                        path="novo"
                        element={<NewCarModel />}
                    />
                </Route>
                <Route path="/carros">
                    <Route
                        index
                        element={<Cars />}
                    />
                    <Route
                        path="novo"
                        element={<NewCar />}
                    />
                </Route>
                <Route path="/clientes">
                    <Route
                        index
                        element={<Customers />}
                    />
                    <Route
                        path="novo"
                        element={<NewCustomer />}
                    />
                </Route>
                <Route path="/transacoes">
                    <Route
                        index
                        element={<Transactions />}
                    />
                    <Route
                        path="nova"
                        element={<NewTransaction />}
                    />
                    <Route
                        path=":id/editar"
                        element={<EditTransaction />}
                    />
                </Route>
            </Route>
            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
}