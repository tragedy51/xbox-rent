import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import cls from './BottomSheet.module.css';
import { useEffect, useRef, useState } from 'react';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useStore } from '../../store';

export const CustomBottomSheet = ({
	isOpen,
	setIsopen,
	children,
	adjustPosition,
}) => {
	const modalRef = useRef(null);
	const controls = useAnimation();
	const mainRef = useRef(null);
	const [isScrollable, setIsScrollable] = useState(false);
	const [isInView, setIsInView] = useState(true);
	const { direction } = useStore((state) => state);

	useScrollDirection(mainRef);

	function handleDragEnd(e, info) {
		const modalHeight = modalRef.current.offsetHeight - 30 - 48 - 72;

		if (info.offset.y > modalHeight / 2) {
			setIsopen(false);
		} else {
			controls.start({ y: 0 });
		}

		// setIsScrollable(true);
	}

	// function handleDrag(_, info) {
	// 	if (isInView && direction === 'up') {
	// 		controls.set({y: 150})
	// 	} else {
	// 		console.log('no');
	// 	}
	// }

	// function hadnleDragStart() {
	// 	if (mainRef.current.scrollTop === 0 && direction === 'up') {
	// 		setIsScrollable(false);
	// 	} else {
	// 		setIsScrollable(true);
	// 	}
	// }

	// const handleScroll = (e) => {
	// 	if (direction === 'up' && e.target.scrollTop === 0) {
	// 		setIsScrollable(false);
	// 	}
	// };

	function handleChangeScrollable() {
		if (direction === 'up') {
			setIsScrollable(false);
		} else {
			setIsScrollable(true);
		}
	}

	useEffect(() => {
		const content = mainRef?.current;
		if (content?.scrollHeight > content?.clientHeight) {
			setIsScrollable(true);
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			controls.start({ y: adjustPosition ? '-50px' : 0 });
		}
	}, [isOpen, adjustPosition, controls]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						ref={modalRef}
						drag={'y'}
						onDragEnd={handleDragEnd}
						// onDrag={handleDrag}
						// onDragStart={hadnleDragStart}
						dragConstraints={{ top: 0, bottom: isScrollable ? 0 : 'none' }}
						dragElastic={0}
						initial={{ y: '100%' }}
						animate={controls}
						exit={{ y: '100%' }}
						transition={{
							duration: 0.4,
							ease: 'easeInOut',
						}}
						className={cls.sheet}>
						<div className={cls.sheetBody}>
							<header className={cls.sheetHeader}>
								<div className='wrapper'>
									<button
										className={cls.closeBtn}
										onClick={() => setIsopen(false)}>
										Закрыть
									</button>
								</div>
							</header>
							<motion.main
								style={{ overflowY: isScrollable ? 'auto' : 'clip' }}
								ref={mainRef}
								className={cls.sheetMain}>
								<motion.div
									whileInView={handleChangeScrollable}
									style={{ height: 0 }}
								/>
								{children}
							</motion.main>
						</div>
					</motion.div>
					<motion.div
						onClick={() => setIsopen(false)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={cls.backdrop}
					/>
				</>
			)}
		</AnimatePresence>
	);
};
