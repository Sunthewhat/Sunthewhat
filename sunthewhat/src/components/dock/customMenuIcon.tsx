import { Box, Image } from '@chakra-ui/react';
import { FC, useState } from 'react';

export type CustomMenuIconProps = {
	id: number;
	icon: string;
	title: string;
	backgroundColor: string;
	handleClick: (id: number) => void;
};

const CustomMenuIcon: FC<CustomMenuIconProps> = ({
	id,
	icon,
	title,
	backgroundColor,
	handleClick,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	return (
		<Box
			bg={backgroundColor}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			p={1}
			w={'4dvh'}
			h={'4dvh'}
			transform={isClicked ? 'scale(0.9)' : 'scale(1)'}
			transition={'transform 0.1s'}
			borderRadius={'25%'}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleClick(id)}
			onMouseDown={() => {
				setIsClicked(true);
			}}
			onMouseUp={() => {
				setIsClicked(false);
			}}
		>
			<Image src={icon} h={'2dvh'} />
			{isHovered && (
				<Box
					pos={'absolute'}
					top={'-3dvh'}
					bg={'#24282B'}
					color={'white'}
					px={'1dvh'}
					py={'0.2dvh'}
					borderRadius={5}
					boxShadow={'0 0 8px rgba(255, 255, 255, 0.2)'}
				>
					{title}
				</Box>
			)}
		</Box>
	);
};

export { CustomMenuIcon };
