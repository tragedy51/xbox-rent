import cls from './alert-message.module.css';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect } from 'react';

const AlertMessage = ({ message, setIsOpen }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(false);
		}, 2500);

		return () => {
			return clearTimeout(timer);
		};
	}, [setIsOpen]);

	return (
		<motion.div
			initial={{
				top: '-100px',
			}}
			animate={{
				top: '15px',
			}}
			exit={{
				top: '-100px',
			}}
			className={cls.alertMessage}>
			{message}
			<button onClick={() => setIsOpen(false)}>
				<Icon width={25} height={25} icon='formkit:close' />
			</button>
		</motion.div>
	);
};

export default AlertMessage;
