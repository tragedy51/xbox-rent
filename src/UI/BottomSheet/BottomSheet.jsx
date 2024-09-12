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
	const { direction } = useStore((state) => state);
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
										<button className={cls.shareBtn}>
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
								className={cls.sheetMain}>
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

// export const CustomBottomSheet = ({
// 	sheetBgColor,
// 	isOpen,
// 	setIsopen,
// 	children,
// 	adjustPosition,
// 	bottomSheetHeader,
// }) => {
// 	const modalRef = useRef(null);
// 	const controls = useAnimation();
// 	const mainRef = useRef(null);
// 	const [isScrollable, setIsScrollable] = useState(false);
// 	const { direction } = useStore((state) => state);

// 	useScrollDirection(mainRef);

// 	function handleDragEnd(_, info) {
// 		const modalHeight = modalRef.current.offsetHeight - 30 - 48 - 72;

// 		if (info.offset.y > modalHeight / 4) {
// 			setIsopen(false);
// 		} else {
// 			controls.start({ y: 0 });
// 		}

// 		if (direction === 'down') setIsScrollable(true);
// 	}

// 	function handleChangeScrollable() {
// 		if (direction === 'up') {
// 			setIsScrollable(false);
// 		}
// 	}

// 	useEffect(() => {
// 		if (isOpen) {
// 			controls.start({
// 				y: adjustPosition ? -20 : 0,
// 				width: adjustPosition ? '90%' : '100%',
// 				marginInline: 'auto',
// 			});
// 		}
// 	}, [controls, isOpen, adjustPosition]);

// 	return (
// 		<AnimatePresence>
// 			{isOpen && (
// 				<>
// 					<motion.div
// 						ref={modalRef}
// 						drag={'y'}
// 						onDragEnd={handleDragEnd}
// 						dragConstraints={{ top: 0, bottom: isScrollable ? 0 : 'none' }}
// 						dragElastic={0}
// 						initial={{ y: '100%' }}
// 						animate={controls}
// 						exit={{ y: '100%' }}
// 						transition={{
// 							duration: 0.4,
// 							ease: 'easeInOut',
// 						}}
// 						style={sheetBgColor && { background: sheetBgColor }}
// 						className={cls.sheet}>
// 						<div className={cls.sheetBody}>
// 							<header className={cls.sheetHeader}>
// 								<div className='wrapper'>
// 									<button
// 										className={cls.closeBtn}
// 										onClick={() => setIsopen(false)}>
// 										Закрыть
// 									</button>
// 									{bottomSheetHeader && (
// 										<div className={cls.sheetHeaderContent}>
// 											{bottomSheetHeader}
// 										</div>
// 									)}
// 									{!bottomSheetHeader && <div className={cls.line} />}
// 								</div>
// 							</header>
// 							<motion.main
// 								style={{ overflowY: isScrollable ? 'auto' : 'clip' }}
// 								ref={mainRef}
// 								className={cls.sheetMain}>
// 								<motion.div
// 									whileInView={handleChangeScrollable}
// 									style={{ height: 0 }}
// 								/>
// 								{children}
// 							</motion.main>
// 						</div>
// 					</motion.div>
// 					<motion.div
// 						onClick={() => setIsopen(false)}
// 						initial={{ opacity: 0 }}
// 						animate={{ opacity: 1 }}
// 						exit={{ opacity: 0 }}
// 						className={cls.backdrop}
// 					/>
// 				</>
// 			)}
// 		</AnimatePresence>
// 	);
// };
