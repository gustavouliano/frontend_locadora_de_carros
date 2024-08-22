import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getRentals, getRentalsInfo } from "../../../services/requests";
import { Body, Container, Empty, EmptyIcon, EmptyLabel, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading } from "./styles";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { RentalTable } from "../../../@types/Rental";
import { RentalsTable } from "../../../components/RentalsTable";

export const Rentals = () => {

    const [loadingRequest, setLoadingRequest] = useState(true);
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });
    const [rentals, setRentals] = useState<RentalTable[]>([]);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleGetCars = async () => {
        setLoadingRequest(true);
        const request = await getRentals();
        setLoadingRequest(false);

        if (request.data) {
            setRentals(request.data.rentals);
        }

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
    }

    const onClickNew = () => {
        return navigate('/locacoes/novo');
    }
    const handleEditTransaction = (id: string) => {
        return navigate(`/transacoes/${id}/editar`);
    }

    const handleDeleteTransaction = async () => {
        if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
            setLoadingRequest(true);
            // await deleteTransaction(id);
            // await handleGetTransactions();
            setLoadingRequest(false);
            setShowAlert({ type: 'success', message: 'Transação excluída com sucesso!', show: true });
        }
    }

    const onClickDownload = async () => {
        const request = await getRentalsInfo();
        console.log(request);
        if (request.data){
            const url = window.URL.createObjectURL(new Blob([request.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio.txt');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    useEffect(() => {
        handleGetCars();
    }, [])



    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Locações</HeaderTitle>
                    <HeaderSubtitle>Consulte, adicione e gerencie todos as locações</HeaderSubtitle>
                </HeaderInfo>
                <Button onClick={onClickNew} borderRadius="md" width="120px">Adicionar nova locação</Button>
                <Button onClick={onClickDownload} borderRadius="md" width="120px">Baixar relatório</Button>
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
                    {rentals.length === 0 ?
                        <Empty>
                            <EmptyIcon />
                            <EmptyLabel>
                                Nenhuma locação encontrado
                            </EmptyLabel>
                        </Empty>
                        :
                        <RentalsTable
                            data={rentals}
                            onEdit={handleEditTransaction}
                            onDelete={handleDeleteTransaction}
                        />
                    }
                </Body>
            }


        </Container>
    );
}