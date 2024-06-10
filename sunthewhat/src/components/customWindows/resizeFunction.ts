import { WindowDimensions } from './customWindows';

const handleResizeMouseDownFunc = (
	e: React.MouseEvent,
	draggable: boolean,
	dimension: WindowDimensions,
	setDimension: React.Dispatch<React.SetStateAction<WindowDimensions>>,
	defaultWidth: number,
	defaultHeight: number,
	minScale: number
) => {
	if (draggable === false) return;
	e.preventDefault();
	const startX = e.clientX;
	const startY = e.clientY;
	const startWidth = dimension.width;
	const startHeight = dimension.height;

	const handleMouseMove = (moveEvent: MouseEvent) => {
		const deltaX = moveEvent.clientX - startX;
		const deltaY = moveEvent.clientY - startY;
		setDimension({
			width:
				startWidth + deltaX < defaultWidth * minScale
					? defaultWidth * minScale
					: startWidth + deltaX,
			height:
				startHeight + deltaY < defaultHeight * minScale
					? defaultHeight * minScale
					: startHeight + deltaY,
		});
	};

	const handleMouseUp = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
};

export { handleResizeMouseDownFunc };
