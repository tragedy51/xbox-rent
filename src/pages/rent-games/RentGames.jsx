import AllGames from '../../modules/AllGames/AllGames';
import CategoryFilter from '../../modules/Categories/Categories';
import HotNewGames from '../../modules/HotNewGames/HotNewGames';
import NewPredictionGames from '../../modules/NewPredictionGames/NewPredictionGames';
import RussianLangGames from '../../modules/russian-lang-games/russian-lang-games';
import SeriesGames from '../../modules/series-games/series-games';
import { CategoryBottomSheet } from '../../modules/CategoryBottomSheet/CategoryBottomSheet';
import { GameInfo } from '../../modules/game-info/game-info';
import { BasketCard } from '../../modules';
import { useStore } from '../../store';
import { checkUserConsole } from './api/checkConsole';
import WebApp from '@twa-dev/sdk';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { hashString } from '../../helpers/hashString';
import SelectConsole from './components/select-console/select-console';

export const RentGames = () => {
	const [openConsoleModal, setOpenConsoleModal] = useState(false);

	const [hash, setHash] = useState();
	const { gameInfoBottomSheetIsOpen, basketBottomSheet } = useStore(
		(state) => state
	);

	const { data, isSuccess } = useQuery({
		queryKey: ['user-info'],
		queryFn: () =>
			checkUserConsole({
				token: hash,
				id: WebApp?.initDataUnsafe?.user?.id || 1147564292,
			}),
		enabled: hash !== undefined,
	});

	useEffect(() => {
		hashString(
			import.meta.env.VITE_AUTH_TOKEN +
				(WebApp?.initDataUnsafe?.user?.id || 1147564292)
		).then((hash) => {
			setHash(hash);
		});
	}, []);

	useEffect(() => {
		if (isSuccess) {
			if (!data.console) {
				setOpenConsoleModal(true);
			}
		}
	}, [data, isSuccess]);

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
			<SelectConsole
				openConsoleModal={openConsoleModal}
				setOpenConsoleModal={setOpenConsoleModal}
			/>
		</>
	);
};
