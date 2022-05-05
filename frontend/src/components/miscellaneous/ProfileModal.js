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
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import React from 'react';

const ProfileModal = ({ user,chat, setChat, chats, setChats, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();


	const handleDeleteChat = () => {
		setChats(chats.filter(ch => ch._id !== chat._id))
		onClose()
		setChat('')
	}

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
						{user.name}
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
							src={user.pic}
							name={user.name}
						/>
						<Text
							fontSize={{ base: '28px', md: '30px' }}
							fontFamily={'Work sans'}
							textAlign={'center'}
						>
							Email:
							<br/>
							{user.email}
						</Text>
					</ModalBody>

					<ModalFooter
					d={'flex'}
					justifyContent={'space-between'}
					>
						<Button colorScheme='red' mr={3} onClick={handleDeleteChat}>
							Delete Chat
						</Button>
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
