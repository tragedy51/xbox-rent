import { motion } from 'framer-motion';
import SearchIcon from '../../../../assets/icons/search-icon.svg?react';

import cls from './SearchInput.module.css';

const searchInputVariants = {
	open: {
		width: '100%',
	},
	close: {
		width: '50px',
	},
};

export const SearchInput = ({ searchIsActive, ...props }) => {
	return (
		<motion.div
			initial={'close'}
			animate={searchIsActive ? 'open' : 'close'}
			variants={searchInputVariants}
			className={cls.inputCont}>
			<label htmlFor='search'>
				<SearchIcon width={18} height={18} />
			</label>
			<input id='search' placeholder='Search...' type='text' {...props} />
		</motion.div>
	);
};
