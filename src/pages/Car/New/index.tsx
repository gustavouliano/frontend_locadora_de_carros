import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { getCarModels, newCar } from "../../../services/requests";
import { Body, Container, Footer, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading } from "./styles";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import NumberInput from "../../../components/NumberInput";
import SelectInput from "../../../components/SelectInput";
import { CarModel } from "../../../@types/CarModel";

export const NewCar = () => {

    const [loadingRequest, setLoadingRequest] = useState(false);
    const [plateValue, setPlateValue] = useState('');
    const [kmValue, setKmValue] = useState(0);
    const [carModelValue, setCarModelValue] = useState('');
    const [carModelOptions, setCarModelOptions] = useState<CarModel[]>([]);
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });

    const theme = useTheme();

    const handleOnClick = async () => {
        const [plate, km, carModel] = [plateValue, kmValue, carModelValue];
        if (!plate || !km) {
            setShowAlert({ type: 'error', message: 'Preencha todos os campos!', show: true });
            return;
        }

        setLoadingRequest(true);
        const request = await newCar(plate, km, carModel);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
        else {
            setShowAlert({ type: 'success', message: 'Carro criado com sucesso!', show: true });
            setPlateValue('');
            setKmValue(0);
            setCarModelValue('');
        }

    }

    const handleGetCarModels = async () => {
        const request = await getCarModels();
        if (request.data) {
            setCarModelOptions(request.data.carModels);
            setCarModelValue(request.data.carModels[0]._id);
        }
    }

    useEffect(() => {
        handleGetCarModels();
    }, []);


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Novo carro</HeaderTitle>
                    <HeaderSubtitle>Crie um novo carro, preencha os campos abaixo e clique em salvar!</HeaderSubtitle>
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
                        <TextInput
                            label="Placa:"
                            placeholder="Ex: AABA1A"
                            value={plateValue}
                            onChange={e => setPlateValue(e.target.value)}
                            borderRadius="sm"
                        />
                        <NumberInput
                            label="KM do carro"
                            placeholder="Ex: 10.000"
                            value={kmValue}
                            onChange={e => setKmValue(Number(e.target.value))}
                            borderRadius="sm"
                        />
                        <SelectInput
                            label="Modelo do carro"
                            options={carModelOptions.map(car => ({ label: car.name, value: car._id }))}
                            value={carModelValue}
                            onChange={e => setCarModelValue(e.target.value)}
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