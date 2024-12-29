import {
	AnimatePresence,
	motion,
	useAnimation,
	useMotionValue,
} from 'framer-motion';
import cls from './BottomSheet.module.css';
import { useEffect, useRef, useState } from 'react';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useStore } from '../../store';
import { IphoneShareIcon } from '../../assets';
import { handleTelegramShare } from '../../helpers/handleTelegramShare';

export const CustomBottomSheet = ({
	sheetBgColor,
	isOpen,
	setIsopen,
	children,
	adjustPosition,
	shareIcon,
	bottomSheetHeader,
	onClose = () => {},
}) => {
	const y = useMotionValue(0);
	const [onTheTop, setOnTheTop] = useState(true);
	const modalRef = useRef(null);
	const controls = useAnimation();
	const backdropControls = useAnimation();
	const mainRef = useRef(null);
	const { direction, activeGame } = useStore((state) => state);
	const touchStartPoint = useRef(0);

	useScrollDirection(mainRef);

	function handleTouchMove(e) {
		const touchY = e.touches[0].clientY - touchStartPoint.current;
		if (onTheTop && direction === 'up') {
			if (y.current < 0) return;
			y.set(touchY);
		}
		if (y.current > 0 && direction === 'down') {
			if (y.current < 0) return;
			y.set(touchY);
		}
	}

	async function handleTouchEnd() {
		const modalHeight = modalRef.current.offsetHeight - 30 - 48 - 72;

		if (y.current > modalHeight / 4) {
			await controls.start({ y: modalRef.current.offsetHeight });
			setIsopen(false);
			onClose();
		} else {
			controls.start({ y: 0 });
		}
	}

	useEffect(() => {
		if (isOpen) {
			controls.start({
				y: adjustPosition ? -15 : 0,
				width: adjustPosition ? '90%' : '100%',
				marginInline: 'auto',
			});
		}
	}, [controls, isOpen, adjustPosition, backdropControls]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						ref={modalRef}
						initial={{ y: window.innerHeight }}
						animate={controls}
						exit={{ y: window.innerHeight }}
						transition={{
							duration: 0.4,
							ease: 'easeInOut',
						}}
						style={sheetBgColor ? { y, background: sheetBgColor } : { y }}
						className={`${cls.sheet} ${isOpen ? cls.open : ''}`}>
						<div className={cls.sheetBody}>
							<header
								onTouchStart={(e) => {
									touchStartPoint.current = e.touches[0].clientY;
								}}
								onTouchMove={handleTouchMove}
								onTouchEnd={handleTouchEnd}
								className={cls.sheetHeader}>
								<div className={`wrapper ${cls.sheetHeaderCont}`}>
									<button
										className={cls.closeBtn}
										onClick={() => {
											setIsopen(false);
											onClose();
										}}>
										Закрыть
									</button>
									{bottomSheetHeader && (
										<div className={cls.sheetHeaderContent}>
											{bottomSheetHeader}
										</div>
									)}
									{!bottomSheetHeader && <div className={cls.line} />}
									{shareIcon && (
										<button
											onClick={() => handleTelegramShare(activeGame)}
											className={cls.shareBtn}>
											<IphoneShareIcon width={25} height={25} />
										</button>
									)}
								</div>
							</header>
							<motion.main
								onTouchStart={(e) => {
									touchStartPoint.current = e.touches[0].clientY;
								}}
								onTouchMove={handleTouchMove}
								onTouchEnd={handleTouchEnd}
								style={{ overflowY: 'auto' }}
								ref={mainRef}
								className={cls.sheetMain}
								id='main-sheet'>
								<motion.div
									onViewportEnter={() => setOnTheTop(true)}
									onViewportLeave={() => setOnTheTop(false)}
									style={{ height: 0 }}
								/>
								{children}
							</motion.main>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsopen(false)}
						className={cls.backdrop}
					/>
				</>
			)}
		</AnimatePresence>
	);
};
