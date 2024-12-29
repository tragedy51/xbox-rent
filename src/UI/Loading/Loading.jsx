import { AnimatePresence, motion } from 'framer-motion';
import { XboxIcon } from '../../assets';

const Loading = ({ loading }) => {
	return (
		<AnimatePresence>
			{loading && (
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.8 }}
					className='loading'>
					<p>
						<span>
							<XboxIcon />
						</span>{' '}
						Загрузка
					</p>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loading;
