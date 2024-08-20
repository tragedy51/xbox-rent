import { XboxIcon } from '../../assets';
import SectionWithSlide from '../../components/SectionWithSlide/SectionWithSlide';
import { games } from '../../consts/games';
import cls from './series-games.module.css';

const SeriesGames = () => {
	let copyGames = [...games];
	[copyGames[0], copyGames[13]] = [copyGames[13], copyGames[0]];

	return (
		<section
			style={{
				background: 'rgb(0 0 0 / 0.2)',
				position: 'relative',
				padding: '2rem 0',
				zIndex: 2,
				marginBottom: 0,
			}}
			className={cls.NewPredictionGames}>
			<div className={cls.blurBg}>
				<SectionWithSlide
					SectionIcon={XboxIcon}
					sectionTitle={'Серии игр'}
					slides={copyGames}
				/>
			</div>
		</section>
	);
};

export default SeriesGames;
