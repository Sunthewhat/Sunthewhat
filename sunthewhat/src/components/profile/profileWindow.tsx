import { FC } from 'react';
import CustomWindows from '../customWindows/customWindows';
import { Box } from '@chakra-ui/react';

type ProfileWindowProps = {
	handleClose: () => void;
};

const ProfileWindow: FC<ProfileWindowProps> = ({ handleClose }) => {
	return (
		<CustomWindows
			title='Profile'
			defaultHeight={500}
			defaultWidth={500}
			minScale={0.1}
			handleCloseWindow={handleClose}
		>
			<Box>This is the profile window</Box>
		</CustomWindows>
	);
};

export { ProfileWindow };
