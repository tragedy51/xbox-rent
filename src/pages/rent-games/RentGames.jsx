// import { useQuery } from '@tanstack/react-query';
import AllGames from '../../modules/AllGames/AllGames';
import CategoryFilter from '../../modules/Categories/Categories';
import HotNewGames from '../../modules/HotNewGames/HotNewGames';
import NewPredictionGames from '../../modules/NewPredictionGames/NewPredictionGames';
import RussianLangGames from '../../modules/russian-lang-games/russian-lang-games';
import SeriesGames from '../../modules/series-games/series-games';
// import { checkUserConsole } from './api/checkConsole';
// import WebApp from '@twa-dev/sdk';
import { CategoryBottomSheet } from '../../modules/CategoryBottomSheet/CategoryBottomSheet';
import { GameInfo } from '../../modules/game-info/game-info';
import { BasketCard } from '../../modules';
import { useStore } from '../../store';

export const RentGames = () => {
	const { gameInfoBottomSheetIsOpen, basketBottomSheet } = useStore(
		(state) => state
	);

	// const { data, isSuccess } = useQuery({
	// 	queryKey: ['user-console-check'],
	// 	queryFn: checkUserConsole(WebApp?.initDataUnsafe?.user?.id),
	// 	enabled: WebApp?.initDataUnsafe?.user?.id !== undefined,
	// });

	// if (isSuccess) {
	// 	console.log(data);
	// }

	return (
		<>
			<main>
				<HotNewGames />
				<CategoryFilter />
				<NewPredictionGames />
				<SeriesGames />
				<RussianLangGames />
				<AllGames />
			</main>
			<CategoryBottomSheet
				adjustPosition={gameInfoBottomSheetIsOpen || basketBottomSheet}
			/>
			<GameInfo adjustPosition={basketBottomSheet} />
			<BasketCard />
		</>
	);
};
