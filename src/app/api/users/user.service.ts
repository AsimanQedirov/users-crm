import {IUser} from "../../models/user";
import baseUrl from "../config";

const getUsers = async (search: string): Promise<Array<IUser>> => {
    const response = await fetch(baseUrl + `users?search=${search}`);
    return await response.json();
}

const addUser = async (body: Omit<IUser, 'id'>) => {
    const response = await fetch(baseUrl + `users`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {'content-type': 'application/json'},
    });
    return await response.json();
}

const editUser = async ({id, body}: {
    id: string,
    body: Omit<IUser, 'id'>
}) => {
    const response = await fetch(baseUrl + `users/${id}`, {
        method: "PUT",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    });
    return await response.json();
}

const getUserById = async (id: string | undefined) => {
    const response = await fetch(baseUrl + `users/${id}`, {
        method: "get",
        headers: {'content-type': 'application/json'},
    });
    if (!response.ok)
        throw 'Error'
    return await response.json();
}
const deleteUser = async (id: number) => {
    const response = await fetch(baseUrl + `users/${id}`, {
        method: "delete",
    });
    return await response.json();
}

export const UserService = {getUsers, addUser, deleteUser, getUserById, editUser}
