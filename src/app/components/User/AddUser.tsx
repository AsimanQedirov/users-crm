import React, {Fragment} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import {UserService} from "../../api/users/user.service";

const AddUser = () => {
    const queryClient = useQueryClient();
    const toast = useToast()
    const {onClose, onOpen, isOpen} = useDisclosure();
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm();
    const {mutate, data, isError, error, isSuccess, isLoading} = useMutation(UserService.addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            reset();
            onClose();
            toast({
                title: 'User created',
                description: "User successfully created !",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    })
    const onSubmit = (data: any) => {
        mutate(data);
    };
    const closeModal = () => {
        onClose();
        reset();
    }
    return (
        <Fragment>
            <Button colorScheme={'green'} onClick={onOpen}>+ Add User</Button>
            <Modal isOpen={isOpen} onClose={closeModal} size={'lg'}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add new user</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)} className={'users__add-user__form'}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' placeholder={'Name'} {...register("name", {
                                    required: "Name required"
                                })}/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Surname</FormLabel>
                                <Input type='text' placeholder={'Surname'} {...register("surname", {
                                    required: "Surname required"
                                })}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type='text' placeholder={'Email'} {...register("email", {
                                    required: "Email required"
                                })}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone</FormLabel>
                                <Input type='text' placeholder={'Phone'} {...register("phone", {
                                    required: "Phone required"
                                })}/>
                            </FormControl>
                            <Fragment>
                                <div className={'users__add-user__form__buttons'}>
                                    <Button colorScheme='blue' mr={3} onClick={closeModal} type={'button'}>
                                        Close
                                    </Button>
                                    <Button isDisabled={isLoading} colorScheme={'green'} type={'submit'}>Add</Button>
                                </div>
                            </Fragment>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Fragment>
    );
};

export default AddUser;
