import React, {Fragment} from 'react';
import {useNavigate, useParams} from "react-router";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {UserService} from "../../api/users/user.service";
import {Button, Divider, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import Loading from "../../components/common/Loading";

const UserEdit = () => {
    const queryClient = useQueryClient();
    const {id} = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const {data, isLoading, isSuccess} =
        useQuery(['users', id], () => UserService.getUserById(id));
    const {mutate, isLoading: isUpdateLoading} = useMutation('users', UserService.editUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            reset();
            navigate('/');
            toast({
                title: 'User update',
                description: "User successfully updated !",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
    })
    const {register, handleSubmit, reset} = useForm({});

    const onSubmit = (body: any) => {
        id && mutate({
            id,
            body
        })
    };

    return (
        <div className={'users__edit'}>
            <div className={'users__edit__back-button'}>
                <Button colorScheme={'blue'} size={'sm'} onClick={() => {
                    navigate(-1);
                }}>Go back</Button>
            </div>
            <Divider/>
            {isLoading && <Loading/>}
            {isSuccess && <form onSubmit={handleSubmit(onSubmit)} className={'users__edit__form'}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input defaultValue={data.name} type='text' placeholder={'Name'}
                           {...register("name", {
                               required: "Name required"
                           })}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Surname</FormLabel>
                    <Input defaultValue={data.surname} type='text' placeholder={'Surname'}
                           {...register("surname", {
                               required: "Surname required"
                           })}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input defaultValue={data.email} type='text' placeholder={'Email'}
                           {...register("email", {
                               required: "Email required"
                           })}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input defaultValue={data.phone} type='text' placeholder={'Phone'}
                           {...register("phone", {
                               required: "Phone required"
                           })}/>
                </FormControl>
                <Fragment>
                    <div>
                        <Button isDisabled={isUpdateLoading} colorScheme={'green'} type={'submit'}>Edit</Button>
                    </div>
                </Fragment>
            </form>}
        </div>
    );
};

export default UserEdit;
