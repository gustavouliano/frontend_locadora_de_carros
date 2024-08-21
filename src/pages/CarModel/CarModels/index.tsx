import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCarModels } from "../../../services/requests";
import { Body, Container, Empty, EmptyIcon, EmptyLabel, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading, Pagination, PaginationItem } from "./styles";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CarModel } from "../../../@types/CarModel";
import { CarModelsTable } from "../../../components/CarModelsTable";

export const CarModels = () => {

    const [loadingRequest, setLoadingRequest] = useState(true);
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });
    const [carModels, setCarModels] = useState<CarModel[]>([]);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleGetTransactions = async () => {
        setLoadingRequest(true);
        const request = await getCarModels();
        setLoadingRequest(false);

        if (request.data) {
            setCarModels(request.data.carModels)
        }

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
    }

    const onClickNew = () => {
        return navigate('/carro-modelos/novo');
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
        handleGetTransactions();
    }, [])


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Modelos de Carro</HeaderTitle>
                    <HeaderSubtitle>Consulte, adicione e gerencie todos os modelos de carro</HeaderSubtitle>
                </HeaderInfo>
                <Button onClick={onClickNew} borderRadius="md" width="120px">Adicionar novo modelo</Button>
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
                    {carModels.length === 0 ?
                        <Empty>
                            <EmptyIcon />
                            <EmptyLabel>
                                Nenhuma transação encontrada
                            </EmptyLabel>
                        </Empty>
                        :
                        <CarModelsTable
                            data={carModels}
                            onEdit={handleEditTransaction}
                            onDelete={handleDeleteTransaction}
                        />
                    }
                </Body>
            }


        </Container>
    );
}