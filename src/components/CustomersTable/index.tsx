import { useTheme } from "styled-components"
import { ActionBtn, Actions, Container, DeleteIcon, EditIcon, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "./styles"
import { Customer } from "../../@types/Customer"

type Props = {
    data: Customer[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
}

export const CustomersTable = ({ data, onEdit, onDelete }: Props) => {
    const theme = useTheme();

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell style={{ width: 1 }}>#ID</TableHeadCell>
                        <TableHeadCell>Nome</TableHeadCell>
                        <TableHeadCell style={{ width: 1 }}>Ações</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(customer => (
                        <TableRow key={customer._id}>
                            <TableCell>#{customer._id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>
                                <Actions>
                                    <ActionBtn $variant="warning" onClick={() => onEdit(customer._id)}><EditIcon /></ActionBtn>
                                    <ActionBtn $variant="danger" onClick={() => onDelete(customer._id)}><DeleteIcon /></ActionBtn>
                                </Actions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}