import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCars } from "../../../services/requests";
import { Body, Container, Empty, EmptyIcon, EmptyLabel, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading } from "./styles";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { CarTable } from "../../../@types/Car";
import { CarsTable } from "../../../components/CarsTable";

export const Cars = () => {

    const [loadingRequest, setLoadingRequest] = useState(true);
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });
    const [cars, setCars] = useState<CarTable[]>([]);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleGetCars = async () => {
        setLoadingRequest(true);
        const request = await getCars();
        setLoadingRequest(false);

        if (request.data) {
            setCars(request.data.cars);
        }

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
    }

    const onClickNew = () => {
        return navigate('/carros/novo');
    }
    const handleEditTransaction = (id: string) => {
        return navigate(`/transacoes/${id}/editar`);
    }

    const handleDeleteTransaction = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
            setLoadingRequest(true);
            // await deleteTransaction(id);
            // await handleGetTransactions();
            setLoadingRequest(false);
            setShowAlert({ type: 'success', message: 'Transação excluída com sucesso!', show: true });
        }
    }

    useEffect(() => {
        handleGetCars();
    }, [])


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Carros</HeaderTitle>
                    <HeaderSubtitle>Consulte, adicione e gerencie todos os carros</HeaderSubtitle>
                </HeaderInfo>
                <Button onClick={onClickNew} borderRadius="md" width="120px">Adicionar novo carro</Button>
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
                <Body>
                    {cars.length === 0 ?
                        <Empty>
                            <EmptyIcon />
                            <EmptyLabel>
                                Nenhum carro encontrado
                            </EmptyLabel>
                        </Empty>
                        :
                        <CarsTable
                            data={cars}
                            onEdit={handleEditTransaction}
                            onDelete={handleDeleteTransaction}
                        />
                    }
                </Body>
            }


        </Container>
    );
}