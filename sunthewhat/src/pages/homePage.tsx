/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@chakra-ui/react';
import { FC, ReactNode, useState } from 'react';
import { Dock } from '../components/dock/dock';

export type activWindowType = {
	id: number;
	component: ReactNode;
};

const Homepage: FC = () => {
	const [activeWindows, setActiveWindows] = useState<activWindowType[]>([]);
	return (
		<Box
			backgroundColor='homepage.background'
			h={'100dvh'}
			w={'100dvw'}
			fontFamily={'Source Sans Pro'}
		>
			<Box
				pos={'absolute'}
				left={'-20dvh'}
				bottom={'-15dvh'}
				w={'100dvw'}
				h={'170dvh'}
				borderRadius={'50%'}
				boxShadow={'0 0 50px rgba(255, 255, 255, 0.2)'}
			/>
			{activeWindows.map((c) => {
				return c.component;
			})}
			<Dock
				activeWindows={activeWindows}
				setActiveWindows={setActiveWindows}
			/>
		</Box>
	);
};

export { Homepage };
