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
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGameDetail } from '../../modules/game-info/api/getGameDetail';

export const RentGames = () => {
	const {
		gameInfoBottomSheetIsOpen,
		basketBottomSheet,
		setGameInfoBottomSheetIsOpen,
		setActiveGame,
	} = useStore((state) => state);
	const [rentId, setRentId] = useState(undefined);

	const { data, isSuccess } = useQuery({
		queryKey: [`game-detail-${rentId}`],
		queryFn: () => getGameDetail(rentId),
		enabled: rentId !== undefined,
	});

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const rentId = queryParams.get('rent_id');
		if (rentId) {
			setRentId(rentId);
		}
	}, []);

	useEffect(() => {
		if (isSuccess) {
			setActiveGame(data);
			setGameInfoBottomSheetIsOpen(true);
		}
	}, [data, isSuccess, setActiveGame, setGameInfoBottomSheetIsOpen]);

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
