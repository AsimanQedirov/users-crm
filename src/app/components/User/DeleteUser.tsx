import React, {Fragment, memo} from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useMutation, useQueryClient} from "react-query";
import {UserService} from "../../api/users/user.service";

const DeleteUser = memo(({id}: { id: number }) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {mutate} = useMutation(UserService.deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            onClose();
            toast({
                title: 'User delete',
                description: "User deleted successfully !",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    })
    const cancelRef = React.useRef<any>();
    const deleteUser = () => mutate(id);
    return (
        <Fragment>
            <Button size={'sm'} colorScheme={'red'} onClick={onOpen}>Delete</Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete User
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteUser} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Fragment>
    );
})

export default DeleteUser;
