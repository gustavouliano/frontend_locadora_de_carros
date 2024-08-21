import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { getCars, getCustomers, newRental } from "../../../services/requests";
import { Body, Container, Footer, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading } from "./styles";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import Button from "../../../components/Button";
import NumberInput from "../../../components/NumberInput";
import SelectInput from "../../../components/SelectInput";
import { Customer } from "../../../@types/Customer";
import { CarTable } from "../../../@types/Car";
import DateInput from "../../../components/DateInput";

export const NewRental = () => {

    const [loadingRequest, setLoadingRequest] = useState(false);
    const [startDateValue, setStartDateValue] = useState('');
    const [endDateValue, setEndDateValue] = useState('');
    const [dailyValue, setDailyValue] = useState(0);
    const [customerValue, setCustomerValue] = useState('');
    const [customerOptions, setCustomerOptions] = useState<Customer[]>([]);
    const [carValue, setCarValue] = useState('');
    const [carOptions, setCarOptions] = useState<CarTable[]>([]);
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });

    const theme = useTheme();

    const handleOnClick = async () => {
        const [startDate, endDate, customer, car] = [startDateValue, endDateValue, customerValue, carValue];
        console.log(startDate);
        if (!startDate || !endDate || !customer || !car) {
            setShowAlert({ type: 'error', message: 'Preencha todos os campos!', show: true });
            return;
        }

        setLoadingRequest(true);
        const startDateTime = new Date(startDate.replace('-', '/')).getTime().toString();
        const endDateTime = new Date(endDate.replace('-', '/')).getTime().toString();
        const request = await newRental(startDateTime, endDateTime, dailyValue, customer, car);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
        else {
            setShowAlert({ type: 'success', message: 'Locação criada com sucesso!', show: true });
            setStartDateValue('');
            setEndDateValue('');
            setDailyValue(0);
            setCustomerValue('')
            setCarValue('');
        }

    }

    const handleGetCars = async () => {
        const request = await getCars();
        if (request.data) {
            setCarOptions(request.data.cars);
            setCarValue(request.data.cars[0]._id);
        }
    }

    const handleGetCustomers = async () => {
        const request = await getCustomers();
        if (request.data) {
            setCustomerOptions(request.data.customers);
            setCustomerValue(request.data.customers[0]._id);
        }
    }
    
    useEffect(() => {
        handleGetCars();
        handleGetCustomers();
    }, []);


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Nova locação</HeaderTitle>
                    <HeaderSubtitle>Crie uma nova locação, preencha os campos abaixo e clique em salvar!</HeaderSubtitle>
                </HeaderInfo>
            </Header>
            <Alert
                type={showAlert.type}
                title={showAlert.message}
                show={showAlert.show}
                setShow={show => setShowAlert({ ...showAlert, show })}
            />

            {
                loadingRequest &&
                <Loading>
                    <ScaleLoader color={theme.COLORS.primary} />
                </Loading>
            }
            {
                !loadingRequest &&
                <>
                    <Body>
                        <DateInput
                            label="Data Início:"
                            placeholder="Ex: 01/01/2024"
                            value={startDateValue}
                            onChange={e => setStartDateValue(e.target.value)}
                        />
                        <DateInput
                            label="Data Fim:"
                            placeholder="Ex: 05/01/2024"
                            value={endDateValue}
                            onChange={e => setEndDateValue(e.target.value)}
                        />
                        <NumberInput
                            label="Diária do aluguel"
                            placeholder="Ex: 300"
                            value={dailyValue}
                            onChange={e => setDailyValue(Number(e.target.value))}
                            borderRadius="sm"
                        />
                        <SelectInput
                            label="Cliente"
                            options={customerOptions.map(customer => ({ label: customer.name, value: customer._id }))}
                            value={customerValue}
                            onChange={e => setCustomerValue(e.target.value)}
                        />
                        <SelectInput
                            label="Carro"
                            options={carOptions.map(car => ({ label: car.plate, value: car._id }))}
                            value={carValue}
                            onChange={e => setCarValue(e.target.value)}
                        />
                    </Body>
                    <Footer>
                        <Button onClick={handleOnClick} size="md" width="110px">
                            Salvar
                        </Button>
                    </Footer>
                </>
            }
        </Container>
    );
}