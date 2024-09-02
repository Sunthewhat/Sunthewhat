import { Box, Text } from '@chakra-ui/react';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { handleDragMouseDownFunc } from './dragFunction';
import { handleResizeMouseDownFunc } from './resizeFunction';

type CustomWindowsProps = {
	children: ReactNode;
	title: string;
	draggable?: boolean;
	defaultHeight: number;
	defaultWidth: number;
	bgColor?: string;
	minScale: number;
	canClose?: boolean;
	canMinimize?: boolean;
	canMaximize?: boolean;
	handleCloseWindow?: () => void;
};

export type Position = {
	top: string;
	left: string;
};

export type WindowDimensions = {
	width: number;
	height: number;
};

const CustomWindows: FC<CustomWindowsProps> = ({
	children,
	title,
	defaultHeight,
	defaultWidth,
	draggable,
	bgColor,
	minScale,
	canClose,
	canMinimize,
	canMaximize,
	handleCloseWindow,
}) => {
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
	const [dimension, setDimension] = useState<WindowDimensions>({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [position, setPosition] = useState<Position>({
		top: sHeight('50') - defaultHeight / 2 + 'px',
		left: sWidth('50') - defaultWidth / 2 + 'px',
	});
	const actinButtonSize = '1.2vh';

	const [windowSize, setWindowSize] = useState<WindowDimensions>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	});

	useEffect(() => {
		setDimension({
			width: defaultWidth,
			height: defaultHeight,
		});
	}, [defaultHeight, defaultWidth]);

	const handleClose = () => {
		console.log('Close');

		if (handleCloseWindow) handleCloseWindow();
	};
	const handleMinimize = () => {
		console.log('Minimize');
	};
	const handleMaximize = () => {
		console.log('Maximize');
	};

	const handleDragMouseDown = (e: React.MouseEvent) => {
		handleDragMouseDownFunc(
			e,
			draggable === undefined || draggable === true,
			position,
			setPosition,
			windowSize,
			dimension
		);
	};

	const handleResizeMouseDown = (e: React.MouseEvent) => {
		handleResizeMouseDownFunc(
			e,
			draggable === undefined || draggable === true,
			dimension,
			setDimension,
			defaultWidth,
			defaultHeight,
			minScale
		);
	};

	return (
		<Box
			pos='absolute'
			top={position.top}
			left={position.left}
			bgColor={bgColor ? bgColor : 'component.windows.background'}
			w={`${dimension.width}px`}
			h={`${dimension.height}px`}
			borderRadius={10}
			overflow='hidden'
			boxShadow='0 0 8px rgba(0, 0, 0, 0.5)'
		>
			<Box
				id='nav'
				bg='component.windows.nav'
				h='2.5vh'
				onMouseDown={handleDragMouseDown}
				zIndex={-1}
			>
				<Box
					pos={'absolute'}
					w={'100%'}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Text
						fontSize={'1.7vh'}
						color={'component.windows.title'}
						fontWeight={'bold'}
						cursor={'default'}
					>
						{title}
					</Text>
				</Box>
				<Box
					h='100%'
					w={'fit-content'}
					display='flex'
					alignItems='center'
					pl='0.75vh'
					zIndex={1}
					cursor={'default'}
				>
					<Box
						w={actinButtonSize}
						h={actinButtonSize}
						bg={
							canClose === undefined || canClose === true
								? 'component.windows.close'
								: '#5C5D5E'
						}
						borderRadius='50%'
						mr='0.7vh'
						onClick={handleClose}
					/>
					<Box
						w={actinButtonSize}
						h={actinButtonSize}
						bg={
							canMinimize === undefined || canMinimize === true
								? 'component.windows.minimize'
								: '#5C5D5E'
						}
						borderRadius='50%'
						mr='0.7vh'
						onClick={handleMinimize}
					/>
					<Box
						w={actinButtonSize}
						h={actinButtonSize}
						bg={
							canMaximize === undefined || canMaximize === true
								? 'component.windows.maximize'
								: '#5C5D5E'
						}
						borderRadius='50%'
						onClick={handleMaximize}
					/>
				</Box>
			</Box>
			<Box position='relative' h='calc(100% - 2.5vh)'>
				{children}
			</Box>
			<Box
				pos='absolute'
				bottom='0'
				right='0'
				w='16px'
				h='16px'
				bg='transparent'
				cursor='nwse-resize'
				onMouseDown={handleResizeMouseDown}
			/>
		</Box>
	);
};

export default CustomWindows;
