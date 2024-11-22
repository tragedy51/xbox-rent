/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useRef, useState } from 'react';
import cls from './ConsoleModal.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { XboxIcon } from '../../assets';
import xboxClickMusic from '../../assets/sounds/xbox-click-sound.mp3';

const contentVariants = {
	open: {
		opacity: 1,
		pointerEvents: 'auto',
		transition: {
			delay: 7,
			duration: 1,
		},
	},
	exit: {
		opacity: 0,
		pointerEvents: 'none',
		transition: {
			duration: 2,
		},
	},
};

const tipVariants = {
	open: {
		opacity: [0.5, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
			repeatType: 'reverse',
		},
	},
	exit: {
		opacity: 0,
		pointerEvents: 'none',
		transition: {
			duration: 1,
		},
	},
};

const xboxButtonVariants = {
	notClicked: {
		opacity: 0.5,
		transition: {
			duration: 1,
			delay: 1,
		},
	},
	clicked: {
		opacity: [0.5, 1, 1, 0],
		filter: 'drop-shadow(0px 0px 20px #4444dd)',
		pointerEvents: 'none',
		transition: {
			duration: 3,
			times: [0, 0.25, 0.75, 1],
		},
	},
};

export const ConsoleModal = ({
	children,
	isOpen,
	setIsopen,
	className,
	endAnimation,
	// setEndAnimation,
	setStartAnimation,
	startAnimation,
}) => {
	const tipTimeout = useRef(null);

	const [xboxIsClicked, setXboxIsClicked] = useState(false);
	const [tipIsOpen, setTipIsOpen] = useState(false);

	let audio = new Audio(xboxClickMusic);

	useEffect(() => {
		tipTimeout.current = setTimeout(() => {
			setTipIsOpen(true);
		}, 6000);

		return () => clearTimeout(tipTimeout.current);
	}, []);

	useEffect(() => {
		if (endAnimation) {
			const timer = setTimeout(() => {
				setIsopen(false);
			}, 6000);

			return () => clearTimeout(timer);
		}
	}, [endAnimation, setIsopen]);

	// function handleClose() {
	// 	setEndAnimation(true);
	// 	setStartAnimation(false);
	// }

	function handleClickXbox() {
		audio.play();
		setXboxIsClicked(true);
		clearTimeout(tipTimeout.current);
		setTipIsOpen(false);
		setStartAnimation(true);
	}

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
								transition: {
									duration: 1,
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									duration: 2,
								},
							}}
							className={`${cls.backdrop}`}
							// onClick={handleClose}
						/>
						<motion.h2
							className={`section-title ${cls.welcomeTitle}`}
							style={{ top: '40px' }}
							variants={tipVariants}
							initial={{ opacity: 0 }}
							animate={tipIsOpen ? 'open' : 'exit'}>
							Нажмите на кнопку xbox
						</motion.h2>
						<motion.button
							onClick={handleClickXbox}
							initial={{ opacity: 0 }}
							variants={xboxButtonVariants}
							animate={xboxIsClicked ? 'clicked' : 'notClicked'}
							className={cls.startButton}>
							<XboxIcon width={55} height={55} />
						</motion.button>
						<motion.h2
							initial={{
								opacity: 0,
								pointerEvents: 'none',
							}}
							animate={
								startAnimation
									? {
											opacity: [0, 1, 1, 0],
											transition: {
												duration: 4,
												delay: 3,
												times: [0, 0.33, 0.66, 1],
											},
									  }
									: {}
							}
							className={`section-title ${cls.welcomeTitle}`}>
							Добро пожаловать!
						</motion.h2>
						<motion.div
							initial={{
								opacity: 0,
								pointerEvents: 'none',
							}}
							variants={contentVariants}
							animate={startAnimation ? 'open' : 'exit'}
							className={`wrapper ${cls.modal} ${className}`}>
							{children}
						</motion.div>
						<motion.h2
							initial={{
								opacity: 0,
								pointerEvents: 'none',
							}}
							animate={
								endAnimation
									? {
											opacity: [0, 1, 1, 0],
											transition: {
												duration: 4,
												delay: 2,
												times: [0, 0.25, 0.75, 1],
											},
									  }
									: {}
							}
							className={`section-title ${cls.welcomeTitle}`}>
							Приятных покупок!
						</motion.h2>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
