import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';
import cls from './game-info.module.css';
import { useQuery } from '@tanstack/react-query';
import { getGameDetail } from './api/getGameDetail';
import GameAbout from './pages/game-about/game-about';
import GameScreens from './pages/game-screens/game-screens';
import GameDlc from './pages/game-dlc/game-dlc';
import GameVideos from './pages/game-videos/game-videos';

export const GameInfo = ({ adjustPosition }) => {
	const [page, setPage] = useState('detail');

	const {
		gameInfoBottomSheetIsOpen,
		setGameInfoBottomSheetIsOpen,
		setProductAddToCardIsVisiible,
		activeGame,
	} = useStore((state) => state);
	const content = useRef(null);

	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: [`game-detail-${activeGame?.id}`],
		queryFn: () => getGameDetail(activeGame?.id),
		enabled: activeGame?.id !== undefined,
	});

	if (isLoading) {
		content.current = <h1>Loading...</h1>;
	}

	if (isError) {
		content.current = <h1>There is some error</h1>;
	}

	if (isSuccess) {
		content.current = (
			<div className={cls.gameInfoCont}>
				<img className={cls.gameInfoMainImg} src={data.wallpaper} alt='' />
				<div className={cls.gamePriceCont}>
					{data.subprice !== '0.00' ? (
						<>
							<div className={cls.discount}>{data.price} ₽</div>
							<p className={cls.price}>{data.subprice} ₽</p>
						</>
					) : (
						<p className={cls.price}>{data.price} ₽</p>
					)}
				</div>
				<header className={cls.gameInfoHeader}>
					<div className='wrapper'>
						<div className={cls.gameInfoHeaderLinks}>
							<button
								className={`${
									page === 'detail' ? `${cls.active} ${cls.navBtn}` : cls.navBtn
								}`}
								onClick={() => setPage('detail')}>
								Об игре
							</button>
							{data.screenshots.length !== 0 && (
								<button
									className={`${
										page === 'screens'
											? `${cls.active} ${cls.navBtn}`
											: cls.navBtn
									}`}
									onClick={() => setPage('screens')}>
									Скрины
								</button>
							)}
							{data.screenshots.length !== 0 && (
								<button
									className={`${
										page === 'videos'
											? `${cls.active} ${cls.navBtn}`
											: cls.navBtn
									}`}
									onClick={() => setPage('videos')}>
									Видео
								</button>
							)}
						</div>
					</div>
				</header>
				<main className={cls.gameInfoMain}>
					{page === 'detail' ? (
						<GameAbout data={data} />
					) : page === 'screens' ? (
						<GameScreens screens={data.screenshots} />
					) : page === 'videos' ? (
						<GameVideos videos={data.videos} />
					) : (
						<GameDlc />
					)}
				</main>
			</div>
		);
	}

	// const gameImgRef = useRef(null);
	// const [gameMainHeight, setGameMainHeight] = useState(100);

	// useEffect(() => {
	// 	if (gameImgRef?.current) {
	// 		const height = gameImgRef?.current?.offsetHeight - 160;
	// 		setGameMainHeight(height);
	// 	}
	// }, [gameInfoBottomSheetIsOpen]);

	useEffect(() => {
		setProductAddToCardIsVisiible(gameInfoBottomSheetIsOpen);
	}, [gameInfoBottomSheetIsOpen, setProductAddToCardIsVisiible]);

	return (
		<CustomBottomSheet
			sheetBgColor='#232222'
			adjustPosition={adjustPosition}
			isOpen={gameInfoBottomSheetIsOpen}
			setIsopen={setGameInfoBottomSheetIsOpen}>
			{content.current}
		</CustomBottomSheet>
	);
};
