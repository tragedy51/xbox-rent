import AllGames from '../../modules/AllGames/AllGames';
import CategoryFilter from '../../modules/Categories/Categories';
import HotNewGames from '../../modules/HotNewGames/HotNewGames';
import NewPredictionGames from '../../modules/NewPredictionGames/NewPredictionGames';
import RussianLangGames from '../../modules/russian-lang-games/russian-lang-games';
import SeriesGames from '../../modules/series-games/series-games';
import { CategoryBottomSheet } from '../../modules/CategoryBottomSheet/CategoryBottomSheet';
import { GameInfo } from '../../modules/game-info/game-info';
import { useStore } from '../../store';
import GameOfDay from './sections/GameOfDay/GameOfDay';

export const RentGames = () => {
	const { gameInfoBottomSheetIsOpen, basketBottomSheet } = useStore(
		(state) => state
	);

	return (
		<>
			<main>
				<HotNewGames />
				<CategoryFilter />
				<NewPredictionGames />
				<SeriesGames />
				<RussianLangGames />
				<GameOfDay />
				<AllGames />
			</main>
			<CategoryBottomSheet
				adjustPosition={gameInfoBottomSheetIsOpen || basketBottomSheet}
			/>
			<GameInfo adjustPosition={basketBottomSheet} />
		</>
	);
};
