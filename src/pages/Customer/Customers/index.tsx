import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../../services/requests";
import { Body, Container, Empty, EmptyIcon, EmptyLabel, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading } from "./styles";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { Customer } from "../../../@types/Customer";
import { CustomersTable } from "../../../components/CustomersTable";

export const Customers = () => {

    const [loadingRequest, setLoadingRequest] = useState(true);
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });
    const [customers, setCustomers] = useState<Customer[]>([]);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleGetCustomers = async () => {
        setLoadingRequest(true);
        const request = await getCustomers();
        setLoadingRequest(false);

        if (request.data) {
            setCustomers(request.data.customers);
        }

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
    }

    const onClickNew = () => {
        return navigate('/clientes/novo');
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
        handleGetCustomers();
    }, [])


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Clientes</HeaderTitle>
                    <HeaderSubtitle>Consulte, adicione e gerencie todos os clientes</HeaderSubtitle>
                </HeaderInfo>
                <Button onClick={onClickNew} borderRadius="md" width="120px">Adicionar novo cliente</Button>
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
                    {customers.length === 0 ?
                        <Empty>
                            <EmptyIcon />
                            <EmptyLabel>
                                Nenhum cliente encontrado
                            </EmptyLabel>
                        </Empty>
                        :
                        <CustomersTable
                            data={customers}
                            onEdit={handleEditTransaction}
                            onDelete={handleDeleteTransaction}
                        />
                    }
                </Body>
            }


        </Container>
    );
}