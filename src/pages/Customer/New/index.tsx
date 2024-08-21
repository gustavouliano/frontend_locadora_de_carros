import { useState } from "react";
import { useTheme } from "styled-components";
import { newCustomer } from "../../../services/requests";
import { Body, Container, Footer, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading } from "./styles";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";

export const NewCustomer = () => {

    const [loadingRequest, setLoadingRequest] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });

    const theme = useTheme();

    const handleOnClick = async () => {
        const [name] = [nameValue];
        if (!name) {
            setShowAlert({ type: 'error', message: 'Preencha todos os campos!', show: true });
            return;
        }

        setLoadingRequest(true);
        const request = await newCustomer(name);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
        else {
            setShowAlert({ type: 'success', message: 'Cliente criado com sucesso!', show: true });
            setNameValue('');
        }

    }

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Novo cliente</HeaderTitle>
                    <HeaderSubtitle>Crie um novo cliente, preencha os campos abaixo e clique em salvar!</HeaderSubtitle>
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
                            label="Nome:"
                            placeholder="Ex: João Silva"
                            value={nameValue}
                            onChange={e => setNameValue(e.target.value)}
                            borderRadius="sm"
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