import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/layout';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const ChatPage = () => {
	const { user, setUser } = ChatState();

	const history = useHistory();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		setUser(userInfo);

		if (!userInfo) history.push('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history]);

	console.log('chatpage user', user);

	return (
		<div style={{ width: '100%' }}>
			{user && <SideDrawer />}
			<Box
				d={'flex'}
				justifyContent={'space-between'}
				w={'100%'}
				h={'91.5vh'}
				p={'10px'}
			>
				{user && <MyChats />}
				{user && <ChatBox />}
			</Box>
		</div>
	);
};

export default ChatPage;
