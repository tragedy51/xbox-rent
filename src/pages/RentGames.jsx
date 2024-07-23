import AllGames from '../modules/AllGames/AllGames';
import CategoryFilter from '../modules/Categories/Categories';
import HotNewGames from '../modules/HotNewGames/HotNewGames';
import NewPredictionGames from '../modules/NewPredictionGames/NewPredictionGames';

const RentGames = () => {
	return (
		<main>
			<HotNewGames />
			<CategoryFilter />
			<NewPredictionGames />
			<AllGames />
		</main>
	);
};

export default RentGames;
