import SectionWithSlide from '../../components/SectionWithSlide/SectionWithSlide';
import { games } from '../../consts/games';
import cls from './russian-lang-games.module.css';
import { RussianFlagIcon } from '../../assets';
import { useMemo } from 'react';

let copyGames = [...games];

const RussianLangGames = () => {
	const randomIndex = useMemo(() => Math.floor(Math.random() * 13), []);

	[copyGames[0], copyGames[randomIndex]] = [copyGames[randomIndex], copyGames[0]];

	return (
		<section
			style={{
				backgroundImage: `url(${copyGames[0].imgSrc})`,
				position: 'relative',
				zIndex: 2,
			}}
			className={cls.NewPredictionGames}>
			<div className={cls.blurBg}>
				<SectionWithSlide
					SectionIcon={RussianFlagIcon}
					sectionTitle={'Полностью на русском'}
					slides={copyGames}
					bigCards={true}
				/>
			</div>
		</section>
	);
};

export default RussianLangGames;
