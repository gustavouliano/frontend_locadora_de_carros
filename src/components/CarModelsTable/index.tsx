import { useTheme } from "styled-components"
import { ActionBtn, Actions, Container, DeleteIcon, EditIcon, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "./styles"
import { CarModel } from "../../@types/CarModel"
import { HiThumbDown, HiThumbUp } from "react-icons/hi"

type Props = {
    data: CarModel[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
}

export const CarModelsTable = ({ data, onEdit, onDelete }: Props) => {
    const theme = useTheme();

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell style={{ width: 1 }}>#ID</TableHeadCell>
                        <TableHeadCell>Nome</TableHeadCell>
                        <TableHeadCell>Marca</TableHeadCell>
                        <TableHeadCell>Possui airbag?</TableHeadCell>
                        <TableHeadCell>Possui freio ABS?</TableHeadCell>
                        <TableHeadCell style={{ width: 1 }}>Ações</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(carModel => (
                        <TableRow key={carModel._id}>
                            <TableCell>#{carModel._id}</TableCell>
                            <TableCell>{carModel.name}</TableCell>
                            <TableCell>{carModel.brand}</TableCell>
                            <TableCell>{carModel.airbag ? <HiThumbUp /> : <HiThumbDown />}</TableCell>
                            <TableCell>{carModel.abs ? <HiThumbUp /> : <HiThumbDown />}</TableCell>
                            <TableCell>
                                <Actions>
                                    <ActionBtn $variant="warning" onClick={() => onEdit(carModel._id)}><EditIcon /></ActionBtn>
                                    <ActionBtn $variant="danger" onClick={() => onDelete(carModel._id)}><DeleteIcon /></ActionBtn>
                                </Actions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}