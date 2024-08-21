import { useTheme } from "styled-components"
import { ActionBtn, Actions, Container, DeleteIcon, EditIcon, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "./styles"
import { Car, CarTable } from "../../@types/Car"

type Props = {
    data: CarTable[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
}

export const CarsTable = ({ data, onEdit, onDelete }: Props) => {
    const theme = useTheme();

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell style={{ width: 1 }}>#ID</TableHeadCell>
                        <TableHeadCell>Placa</TableHeadCell>
                        <TableHeadCell>KM</TableHeadCell>
                        <TableHeadCell>Modelo do carro</TableHeadCell>
                        <TableHeadCell style={{ width: 1 }}>Ações</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(car => (
                        <TableRow key={car._id}>
                            <TableCell>#{car._id}</TableCell>
                            <TableCell>{car.plate}</TableCell>
                            <TableCell>{car.km}</TableCell>
                            <TableCell>{car.carModel.name}</TableCell>
                            <TableCell>
                                <Actions>
                                    <ActionBtn $variant="warning" onClick={() => onEdit(car._id)}><EditIcon /></ActionBtn>
                                    <ActionBtn $variant="danger" onClick={() => onDelete(car._id)}><DeleteIcon /></ActionBtn>
                                </Actions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}