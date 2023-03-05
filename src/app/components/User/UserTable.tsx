import React from 'react';
import {Button, Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {IUser} from "../../models/user";
import {useNavigate} from "react-router";
import DeleteUser from "./DeleteUser";

const UserTable = ({data}: {
    data: Array<IUser>
}) => {
    const navigate = useNavigate();
    const navigateToEdit = (id: number) => navigate(`user/${id}`);

    return (
        <TableContainer className={'user-table'}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Surname</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.length > 0 && data.map((user: IUser, _index: number) => {
                        return <Tr key={_index}>
                            <Th>{user.id}</Th>
                            <Th>{user.name}</Th>
                            <Th>{user.surname}</Th>
                            <Th>{user.email}</Th>
                            <Th>{user.phone}</Th>
                            <Th className='user-table__action-buttons'>
                                <Button size={'sm'} colorScheme={'blue'}
                                        onClick={() => navigateToEdit(user.id)}>Edit</Button>
                                <DeleteUser id={user.id}/>
                            </Th>
                        </Tr>
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
