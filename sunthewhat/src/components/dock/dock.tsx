import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { CustomMenuIcon } from './customMenuIcon';
import { ProfileWindow } from '../profile/profileWindow';
import { activWindowType } from '../../pages/homePage';

type MenuType = {
	id: number;
	icon: string;
	title: string;
	backgroundColor: string;
	component: React.ReactNode;
};

type DockProps = {
	activeWindows: activWindowType[];
	setActiveWindows: React.Dispatch<React.SetStateAction<activWindowType[]>>;
};

const Dock: FC<DockProps> = ({ activeWindows, setActiveWindows }) => {
	const MenuList: MenuType[] = [
		{
			id: 1,
			icon: '/assets/profile.png',
			title: 'Profile',
			backgroundColor: 'white',
			component: (
				<ProfileWindow key={1} handleClose={() => handleClose(1)} />
			),
		},
	];
	const handleClick = (id: number) => {
		if (activeWindows.find((c) => c.id === id))
			setActiveWindows((prev) => {
				return prev.filter((c) => c.id !== id);
			});
		else {
			setActiveWindows((prev) => [
				...prev,
				{
					id: id,
					component: MenuList.find((c) => c.id === id)!.component,
				},
			]);
		}
	};
	const handleClose = (id: number) => {
		setActiveWindows((prev) => {
			return prev.filter((c) => c.id !== id);
		});
	};

	return (
		<Box
			pos={'absolute'}
			bottom={'1%'}
			w={'100%'}
			display={'flex'}
			justifyContent={'center'}
		>
			<Box
				boxShadow={'0 0 8px rgba(0, 0, 0, 0.5)'}
				h={'5dvh'}
				paddingX={'10px'}
				paddingY={'5px'}
				display={'flex'}
				alignItems={'center'}
				gap={'10px'}
				borderRadius={'10px'}
			>
				{MenuList.map((c: MenuType, index: number) => (
					<CustomMenuIcon
						key={index}
						id={c.id}
						icon={c.icon}
						title={c.title}
						backgroundColor={c.backgroundColor}
						handleClick={handleClick}
					/>
				))}
			</Box>
		</Box>
	);
};

export { Dock };
