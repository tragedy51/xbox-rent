import NewPredictionGamesIcon from '../../assets/icons/bestseller-icon.svg?react';
import SectionWithSlide from '../../components/SectionWithSlide/SectionWithSlide';
import { games } from '../../consts/games';

import cls from './NewPredictionGames.module.css';

const NewPredictionGames = () => {
	return (
		<section
			style={{
				backgroundImage: `url(${games[0].imgSrc})`,
				position: 'relative',
				zIndex: 2,
			}}
			className={cls.NewPredictionGames}>
			<div className={cls.blurBg}>
				<SectionWithSlide
					SectionIcon={NewPredictionGamesIcon}
					sectionTitle={'Новинки игр по предзаказу'}
					slides={games}
				/>
			</div>
		</section>
	);
};

export default NewPredictionGames;
