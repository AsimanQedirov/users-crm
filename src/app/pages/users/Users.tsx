import React, {lazy, Suspense, useState} from 'react';
import {useQuery} from "react-query";
import {UserService} from "../../api/users/user.service";
import {Input} from "@chakra-ui/react";
import AddUser from "../../components/User/AddUser";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../components/common/Loading";

const UserTable = lazy(() => import('../../components/User/UserTable'));

const Users = () => {
    const [search, setSearch] = useState<string>('');
    const debounceValue = useDebounce<string>(search, 800);

    const {data, isSuccess, isLoading} =
        useQuery(['users', debounceValue], () => UserService.getUsers(debounceValue),
            {keepPreviousData: true, staleTime: 5000});

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    return (
        <div className={'users'}>
            <div className="users__add-user">
                <Input type='text' value={search} onChange={handleSearch} placeholder={'Search...'}/>
                <AddUser/>
            </div>
            {isLoading && <Loading/>}
            {(isSuccess && data) && <Suspense fallback={<Loading/>}>
                <UserTable data={data}/>
            </Suspense>}
        </div>
    );
};

export default Users;
