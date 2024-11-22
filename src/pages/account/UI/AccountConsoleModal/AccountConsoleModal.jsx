import { AnimatePresence, motion } from 'framer-motion';

import cls from './AccountConsoleModal.module.css';

const AccountConsoleModal = ({ isOpen, setIsopen, className, children }) => {
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
								translateY: '100%',
								translateX: '-50%',
								opacity: 0,
							}}
							exit={{
								translateY: '100%',
								translateX: '-50%',
								opacity: 0,
							}}
							animate={{
								translateY: 'calc(-50% - 12px)',
								translateX: '-50%',
								opacity: 1,
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

export default AccountConsoleModal;
