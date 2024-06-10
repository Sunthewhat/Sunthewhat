import { Position, WindowDimensions } from './customWindows';

const handleDragMouseDownFunc = (
	e: React.MouseEvent,
	draggable: boolean,
	position: Position,
	setPosition: React.Dispatch<React.SetStateAction<Position>>,
	windowSize: WindowDimensions,
	dimension: WindowDimensions
) => {
	if (draggable === false) return;
	e.preventDefault();
	const startX = e.clientX;
	const startY = e.clientY;

	const startTop = parseInt(position.top, 10);
	const startLeft = parseInt(position.left, 10);

	const handleMouseMove = (moveEvent: MouseEvent) => {
		const deltaX = moveEvent.clientX - startX;
		const deltaY = moveEvent.clientY - startY;
		setPosition({
			top: `${startTop + deltaY < 0 ? 0 : startTop + deltaY}px`,
			left: `${startLeft + deltaX}px`,
		});
	};

	const handleMouseUp = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
		setPosition((prev) => {
			const prevTop = parseInt(prev.top.replace('px', ''), 10);
			const prevLeft = parseInt(prev.left.replace('px', ''), 10);
			if (prevTop < 0 && prevLeft < 0) {
				return {
					top: '0px',
					left: '0px',
				};
			}
			if (
				prevTop > windowSize.height - dimension.height &&
				prevLeft > windowSize.width - dimension.width
			) {
				return {
					top: `${windowSize.height - dimension.height}px`,
					left: `${windowSize.width - dimension.width}px`,
				};
			}
			if (prevTop < 0 && prevLeft > windowSize.width - dimension.width) {
				return {
					top: '0px',
					left: `${windowSize.width - dimension.width}px`,
				};
			}
			if (
				prevTop > windowSize.height - dimension.height &&
				prevLeft < 0
			) {
				return {
					top: `${windowSize.height - dimension.height}px`,
					left: '0px',
				};
			}
			if (prevLeft < 0) {
				return {
					top: `${prevTop}px`,
					left: '0px',
				};
			}
			if (prevTop > windowSize.height - dimension.height) {
				return {
					top: `${windowSize.height - dimension.height}px`,
					left: `${prevLeft}px`,
				};
			}
			if (prevLeft > windowSize.width - dimension.width) {
				return {
					top: `${prevTop}px`,
					left: `${windowSize.width - dimension.width}px`,
				};
			}
			return prev;
		});
	};

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
};

export { handleDragMouseDownFunc };
