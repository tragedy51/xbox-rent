import SectionWithSlide from '../../components/SectionWithSlide/SectionWithSlide';

import PercentIcon from '../../assets/icons/percent-icon.svg?react';
import { games } from '../../consts/games';

const PopularGames = () => {
	return (
		<section>
			<SectionWithSlide
				SectionIcon={PercentIcon}
                iconSize={30}
				sectionTitle={'Популярные игры'}
				slides={games}
                withFilter={true}
			/>
		</section>
	);
};

export default PopularGames;
