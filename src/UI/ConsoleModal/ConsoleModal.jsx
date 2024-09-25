import cls from './ConsoleModal.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export const ConsoleModal = ({ children, isOpen, setIsopen, className }) => {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
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
							onClick={() => setIsopen(false)}></motion.div>
						<motion.div
							initial={{
								top: '100%',
							}}
							exit={{
								top: '100%',
							}}
							animate={{
								top: '50%',
							}}
							className={`wrapper ${cls.modal} ${className}`}>
							{children}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
