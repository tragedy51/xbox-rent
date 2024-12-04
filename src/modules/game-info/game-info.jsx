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
import { GamePassIcon, RussianFlagIcon, XSIcon } from '../../assets';
import Loading from '../../UI/Loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';

export const GameInfo = ({ adjustPosition }) => {
	const {
		gameInfoBottomSheetIsOpen,
		setGameInfoBottomSheetIsOpen,
		setProductAddToCardIsVisiible,
		activeGame,
		setXsText,
		changeXsIsOpen,
		isAdmin,
	} = useStore((state) => state);
	const [page, setPage] = useState('detail');
	const [bigImage, setBigImage] = useState('');

	useEffect(() => {
		if (document.getElementById('main-sheet')) {
			document.getElementById('main-sheet').scrollTo(0, 0);
		}
	}, [page, activeGame]);

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

	function handleOpenPreOrder(e, name) {
		e.stopPropagation();
		setXsText(
			`Игра ${name} еще не вышла, но вы уже можете ее приобрести! Дата релиза игры: ${new Date(
				data.release_date
			).toLocaleDateString('ru-Ru', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			})}г`
		);
		changeXsIsOpen(true);
	}

	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: [`game-detail-${activeGame?.id}`],
		queryFn: () => getGameDetail(activeGame?.id),
		enabled: activeGame?.id !== undefined,
	});

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
						<img
							style={{
								filter: 'blur(4px)',
								transform: 'rotate(180deg) scaleX(-1)',
							}}
							className={cls.gameInfoMainImg}
							src={data.wallpaper}
							alt=''
						/>
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
						{data.voice_acting === 'russian' && (
							<RussianFlagIcon
								width={35}
								style={{
									position: 'absolute',
									top: '18px',
									left: '18px',
									borderRadius: '3px',
								}}
							/>
						)}
						{data.pre_order && (
							<p
								onClick={(e) => handleOpenPreOrder(e, data.title)}
								className={cls.banner}>
								Предзаказ
							</p>
						)}
						{data.in_game_pass && (
							<GamePassIcon
								style={{
									position: 'absolute',
									bottom: '80px',
									left: '18px',
									borderRadius: '3px',
								}}
								width={45}
								height={45}
							/>
						)}
					</div>
					<div style={{ background: '#232222' }}>
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
								<GameVideos
									videos={data.videos}
									trailer={data.trailer}
									title={data.title}
								/>
							) : (
								<GameDlc />
							)}
						</main>
					</div>
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
			{isAdmin && (
				<a
					target='_blank'
					href={`https://api.xbox-rent.ru/admin/webapp/product/${activeGame?.id}`}
					className={cls.editButton}>
					<Icon
						style={{ display: 'block' }}
						width={20}
						height={20}
						icon='cuida:edit-outline'
					/>
				</a>
			)}
			<section style={{ position: 'relative', zIndex: 1, minHeight: '100%' }}>
				<Loading loading={isLoading} />
				<AnimatePresence>
					{!isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							{content.current}
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</CustomBottomSheet>
	);
};
