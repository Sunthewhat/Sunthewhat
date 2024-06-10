/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import CustomWindows from '../components/customWindows/customWindows';

const Homepage: FC = () => {
	const [screenW, setScreenW] = useState(window.innerWidth);
	const [screenH, setScreenH] = useState(window.innerHeight);

	useEffect(() => {
		const handleResize = () => {
			setScreenW(window.innerWidth);
			setScreenH(window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	});

	const sWidth = (perc: string) => (screenW * parseInt(perc, 10)) / 100;
	const sHeight = (perc: string) => (screenH * parseInt(perc, 10)) / 100;

	return (
		<Box
			// backgroundColor='homepage.background'
			bg={'#005EA6'}
			h={'100dvh'}
			w={'100dvw'}
			fontFamily={'Source Sans Pro'}
		>
			<CustomWindows
				title='Name'
				defaultHeight={300}
				defaultWidth={300}
				top={sHeight('50') - 300 / 2 + 'px'}
				left={sWidth('50') - 300 / 2 + 'px'}
				minScale={1}
			>
				<Box>Hello, world!</Box>
			</CustomWindows>
		</Box>
	);
};

export { Homepage };
