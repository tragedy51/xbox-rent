import AllGames from '../modules/AllGames/AllGames';
import CategoryFilter from '../modules/Categories/Categories';
import HotNewGames from '../modules/HotNewGames/HotNewGames';
import NewPredictionGames from '../modules/NewPredictionGames/NewPredictionGames';
import PopularGames from '../modules/PopularGames/PopularGames';

const RentGames = () => {
	return (
		<main>
			<HotNewGames />
			<CategoryFilter />
			<NewPredictionGames />
			<PopularGames />
			<AllGames />
		</main>
	);
};

export default RentGames;
