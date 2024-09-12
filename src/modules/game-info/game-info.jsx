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
import { RussianFlagIcon, XSIcon } from '../../assets';

export const GameInfo = ({ adjustPosition }) => {
	const [page, setPage] = useState('detail');
	const [bigImage, setBigImage] = useState('');

	const {
		gameInfoBottomSheetIsOpen,
		setGameInfoBottomSheetIsOpen,
		setProductAddToCardIsVisiible,
		activeGame,
		setXsText,
		changeXsIsOpen,
	} = useStore((state) => state);
	const content = useRef(null);

	function handleOpenXsInfo(e, name) {
		e.stopPropagation();
		setXsText(
			`Значок X|S обозначает что игра ${name} работает только на
						приставке Xbox Series S и Xbox Series X и не работает на приставке
						Xbox one.!`
		);
		changeXsIsOpen(true);
	}

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
			<>
				{bigImage && (
					<>
						<div onClick={() => setBigImage('')} className={cls.backdrop} />
						<div className={cls.bigImage}>
							<img src={bigImage} alt='' />
						</div>
					</>
				)}
				<div className={cls.gameInfoCont}>
					<div className={cls.gameInfoMainImgCont}>
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
						{data.compatibility === 'xbox_series_x_s' && (
							<button
								className={cls.XSBtn}
								onClick={(e) => handleOpenXsInfo(e, data.title)}>
								<XSIcon width={45} height={35} />
							</button>
						)}
						{data.voice_acting === 'russian' && <RussianFlagIcon width={50} style={{position: 'absolute', top: '10px', left: '5px'}} />}
					</div>
					<header className={cls.gameInfoHeader}>
						<div className='wrapper'>
							<div className={cls.gameInfoHeaderLinks}>
								<button
									className={`${
										page === 'detail'
											? `${cls.active} ${cls.navBtn}`
											: cls.navBtn
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
							<GameAbout setBigImage={setBigImage} data={data} />
						) : page === 'screens' ? (
							<GameScreens screens={data.screenshots} />
						) : page === 'videos' ? (
							<GameVideos videos={data.videos} trailer={data.trailer} />
						) : (
							<GameDlc />
						)}
					</main>
				</div>
			</>
		);
	}

	useEffect(() => {
		setProductAddToCardIsVisiible(gameInfoBottomSheetIsOpen);
	}, [gameInfoBottomSheetIsOpen, setProductAddToCardIsVisiible]);

	return (
		<CustomBottomSheet
			shareIcon
			onClose={() => setPage('detail')}
			sheetBgColor='#232222'
			adjustPosition={adjustPosition}
			isOpen={gameInfoBottomSheetIsOpen}
			setIsopen={setGameInfoBottomSheetIsOpen}>
			{content.current}
		</CustomBottomSheet>
	);
};
