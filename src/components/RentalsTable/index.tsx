import { ActionBtn, Actions, Container, DeleteIcon, EditIcon, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "./styles"
import { RentalTable } from "../../@types/Rental"
import { formatDateLoc } from "../../utils/formatDateLoc"

type Props = {
    data: RentalTable[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
}

export const RentalsTable = ({ data, onEdit, onDelete }: Props) => {

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell style={{ width: 1 }}>#ID</TableHeadCell>
                        <TableHeadCell>Data ínicio</TableHeadCell>
                        <TableHeadCell>Data fim</TableHeadCell>
                        <TableHeadCell>Aluguel diário</TableHeadCell>
                        <TableHeadCell>Cliente</TableHeadCell>
                        <TableHeadCell>Carro (placa)</TableHeadCell>
                        <TableHeadCell style={{ width: 1 }}>Ações</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(rental => (
                        <TableRow key={rental._id}>
                            <TableCell>#{rental._id}</TableCell>
                            <TableCell>{formatDateLoc(rental.start_date)}</TableCell>
                            <TableCell>{formatDateLoc(rental.end_date)}</TableCell>
                            <TableCell>{rental.daily_value}</TableCell>
                            <TableCell>{rental.customer.name}</TableCell>
                            <TableCell>{rental.car.plate}</TableCell>
                            <TableCell>
                                <Actions>
                                    <ActionBtn $variant="warning" onClick={() => onEdit(rental._id)}><EditIcon /></ActionBtn>
                                    <ActionBtn $variant="danger" onClick={() => onDelete(rental._id)}><DeleteIcon /></ActionBtn>
                                </Actions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}