import SearchIcon from '../../../../assets/icons/search-icon.svg?react';

import cls from './SearchInput.module.css';

const SearchInput = () => {
	return (
		<div className={cls.inputCont}>
			<SearchIcon width={18} height={18} />
			<input placeholder='Search...' type='text' />
		</div>
	);
};

export default SearchInput;
