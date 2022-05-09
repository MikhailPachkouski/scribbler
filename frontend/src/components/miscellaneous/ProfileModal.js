import {
	Button,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import React from 'react';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';

const ProfileModal = ({ user2, chat, setChat, chats, setChats, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();

	const { fetchAgain, setFetchAgain, user } = ChatState();

	// const handleDeleteChat = () => {
	// 	setChats(chats.filter(ch => ch._id !== chat._id));
	// 	onClose();
	// 	setChat('');
	// };

	const handleDelete = async chat => {
		try {
			await axios.delete(
				'/api/chat/chatremove',
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
					data: {
						chatId: chat._id,
					}
				}
			);
			onClose();
			setChat('');
			setFetchAgain(!fetchAgain);
		} catch (error) {
			console.log(error.response);
			toast({
				title: 'Error Occured!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
		// setGroupChatName("");
	};

	return (
		<>
			{children ? (
				<div onClick={onOpen}>{children}</div>
			) : (
				<IconButton
					// d={{ base: 'flex' }}
					icon={<ViewIcon />}
					onClick={onOpen}
				/>
			)}

			<Modal size={'lg'} isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent h={'400px'}>
					<ModalHeader
						d={'flex'}
						justifyContent={'center'}
						fontSize={'30px'}
						fontFamily={'Work sans'}
						fontWeight={'extrabold'}
					>
						{user2.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						d={'flex'}
						flexDirection={'column'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Image
							borderRadius={'full'}
							boxSize={'150px'}
							src={user2.pic}
							name={user2.name}
						/>
						<Text
							fontSize={{ base: '28px', md: '30px' }}
							fontFamily={'Work sans'}
							textAlign={'center'}
						>
							Email:
							<br />
							{user2.email}
						</Text>
					</ModalBody>

					<ModalFooter d={'flex'} justifyContent={'space-between'}>
						{chat ? (
							<Button
								colorScheme='red'
								mr={3}
								onClick={() => handleDelete(chat)}
							>
								Delete Chat
							</Button>
						) : (
							<div></div>
						)}
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfileModal;
