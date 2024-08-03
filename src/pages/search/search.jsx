import { CloseIcon } from '../../assets';
import { SearchInput } from '../../modules/HotNewGames/UI';
import Button from '../../UI/Button/Button';
import cls from './search.module.css';

export const Search = () => {
	return (
		<main className={cls.Search}>
			<div className='wrapper'>
				<div className={cls.searchHeader}>
					<Button component={'link'} to={'/'}>
						<CloseIcon />
					</Button>
				</div>
				<div className='searchBody'>
					<SearchInput />
				</div>
			</div>
		</main>
	);
};
