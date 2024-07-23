import GameCard from '../../components/GameCard/GameCard';
import { games } from '../../consts/games';
import Button from '../../UI/Button/Button';

import cls from './AllGames.module.css';
import FilterIcon from '../../assets/icons/filter-icon.svg?react';
import DropdownIcon from '../../assets/icons/dropdown-arrows-icon.svg?react';

const AllGames = () => {
	return (
		<section>
			<div className='wrapper'>
				<div className={cls.filterButtons}>
					<Button Icon={DropdownIcon} iconSize={16}>
						По умолчанию
					</Button>
					<Button Icon={FilterIcon} iconSize={16}>
						Все игры
					</Button>
				</div>
				<div className={cls.allGamesCont}>
					{games.map((game) => (
						<GameCard
							key={game.id}
							gameTitle={game.gameTitle}
							gamePrice={game.gamePrice}
							gameDiscountPrice={game.gameDiscountPrice}
							imgSrc={game.imgSrc}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default AllGames;
