import cls from './modal.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export const Modal = ({ children, isOpen, setIsopen, className }) => {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{
							opacity: 0,
						}}
						exit={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						className={`${cls.backdrop}`}
						onClick={() => setIsopen(false)}>
						<motion.div
							initial={{
								translateY: '100%',
								translateX: '-50%',
							}}
							exit={{
								translateY: '100%',
								translateX: '-50%',
							}}
							animate={{
								translateY: '0%',
								translateX: '-50%',
							}}
							className={`wrapper ${cls.modal} ${className}`}>
							{children}
							<button
								onClick={() => setIsopen(false)}
								className={cls.closeModalBtn}>
								Закрыть
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
