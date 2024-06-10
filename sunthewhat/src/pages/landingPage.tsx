import { Box, Image, Text } from '@chakra-ui/react';
import CustomWindows from '../components/customWindows/customWindows';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const [screenW, setScreenW] = useState(window.innerWidth);
	const [screenH, setScreenH] = useState(window.innerHeight);
	const navigate = useNavigate();

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

	const handleConfirm = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		}
		// else {
		// 	if (document.exitFullscreen) {
		// 		document.exitFullscreen();
		// 	}
		// }
		navigate('/home');
	};

	const handleCancle = () => {
		navigate('/home');
	};

	return (
		<Box
			w={'100dvw'}
			h={'100dvh'}
			bg={'#000000'}
			zIndex={1}
			fontFamily={'Source Sans Pro'}
		>
			<CustomWindows
				minScale={0.9}
				title='Fullscreen Warning'
				bgColor='#ECECEA'
				// draggable={false}
				defaultHeight={200}
				defaultWidth={700}
				top={sHeight('50') - 200 / 2 + 'px'}
				left={sWidth('50') - 700 / 2 + 'px'}
				canClose={false}
				canMaximize={false}
				canMinimize={false}
			>
				<Box
					w={'100%'}
					h={'100%'}
					p={'4%'}
					display={'flex'}
					justifyContent={'space-between'}
				>
					<Box h={'100%'} display={'flex'} alignItems={'center'}>
						<Image src={'/logo.svg'} w={'10vh'} h={'10vh'} />
					</Box>
					<Box
						w={'75%'}
						display={'flex'}
						flexDir={'column'}
						justifyContent={'space-between'}
					>
						<Box>
							<Text fontSize={'2vh'} fontWeight={800}>
								This website is recommended to use in
								fullscreen.
							</Text>
							<Text fontSize={'1.7vh'} mt={'2vh'}>
								This web site is best viewed in full screen
								mode. Do you want to switch to full screen mode?
							</Text>
						</Box>
						<Box display={'flex'} w={'100%'} justifyContent={'end'}>
							<Box
								mr={'7%'}
								bg={'white'}
								w={'30%'}
								textAlign={'center'}
								borderRadius={5}
								border={'0.1px solid #00000050'}
								shadow={'0 0 8px rgba(0, 0, 0, 0.05)'}
								onClick={handleCancle}
								cursor={'default'}
							>
								No
							</Box>
							<Box
								color={'white'}
								fontWeight={800}
								textAlign={'center'}
								w={'30%'}
								borderRadius={5}
								background={
									'linear-gradient(0deg, #286EF8 0%, #76A2F3 100%)'
								}
								shadow={'0 0 8px rgba(0, 0, 0, 0.05)'}
								border={'0.1px solid #00000050'}
								onClick={handleConfirm}
								cursor={'default'}
							>
								OK
							</Box>
						</Box>
					</Box>
				</Box>
			</CustomWindows>
		</Box>
	);
};

export { LandingPage };
