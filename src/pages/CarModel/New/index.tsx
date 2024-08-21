import { useState } from "react";
import { useTheme } from "styled-components";
import { newCarModel } from "../../../services/requests";
import { Body, Container, Footer, Header, HeaderInfo, HeaderSubtitle, HeaderTitle, Loading } from "./styles";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import CheckboxInput from "../../../components/CheckboxInput";

export const NewCarModel = () => {

    const [loadingRequest, setLoadingRequest] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [airbagValue, setAirbagValue] = useState(false);
    const [absValue, setAbsValue] = useState(false);
    const [showAlert, setShowAlert] = useState({ type: 'error', message: '', show: false });

    const theme = useTheme();

    const handleOnClick = async () => {
        const [name, brand, airbag, abs] = [nameValue, brandValue, airbagValue, absValue];
        if (!name || !brand) {
            setShowAlert({ type: 'error', message: 'Preencha todos os campos!', show: true });
            return;
        }

        setLoadingRequest(true);
        const request = await newCarModel(name, brand, airbag, abs);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: 'error', message: request.error, show: true });
        }
        else {
            setShowAlert({ type: 'success', message: 'Modelo de carro criado com sucesso!', show: true });
            setNameValue('');
            setBrandValue('');
            setAirbagValue(false);
            setAbsValue(false);
        }

    }


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Novo modelo de carro</HeaderTitle>
                    <HeaderSubtitle>Crie um novo modelo, preencha os campos abaixo e clique em salvar!</HeaderSubtitle>
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
                            label="Nome do modelo"
                            placeholder="Ex: Onix"
                            value={nameValue}
                            onChange={e => setNameValue(e.target.value)}
                            borderRadius="sm"
                        />
                        <TextInput
                            label="Marca"
                            placeholder="Ex: Chevrolet"
                            value={brandValue}
                            onChange={e => setBrandValue(e.target.value)}
                            borderRadius="sm"
                        />
                        <CheckboxInput
                            label="Possui airbag?"  
                            checked={airbagValue}
                            onChange={() => setAirbagValue(!airbagValue)}
                        />
                        <CheckboxInput
                            label="Possui freio ABS?"  
                            checked={absValue}
                            onChange={() => setAbsValue(!absValue)}
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