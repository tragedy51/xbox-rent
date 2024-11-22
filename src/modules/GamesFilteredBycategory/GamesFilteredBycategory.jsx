import GameCard from '../../components/GameCard/GameCard';
import Button from '../../UI/Button/Button';
import { motion } from 'framer-motion';

import cls from './GamesFilteredBycategory.module.css';
import FilterIcon from '../../assets/icons/filter-icon.svg?react';
import DropdownIcon from '../../assets/icons/dropdown-arrows-icon.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import { useQuery } from '@tanstack/react-query';
import { getFilteredGames } from './api/getAllGames';
import { FilterButton, Modal } from '../../UI';
import useScrollDirection from '../../hooks/useScrollDirection';
import Loading from '../../UI/Loading/Loading';

const MotionGameCard = motion(GameCard);

const GamesFilteredBycategory = ({ inBottomSheet, scrollContainerRef }) => {
	const [filtersIsOpen, setFiltersIsOpen] = useState(false);
	const [sortIsOpen, setSortIsOpen] = useState(false);
	const content = useRef(null);
	const allGamesContRef = useRef(null);
	const gameCardRef = useRef(null);

	const {
		emptyCounter,
		setGameInfoBottomSheetIsOpen,
		setActiveGame,
		setIsEnd,
		activeCategory,
		activeSeries,
		voiceActing,
		setCounter,
	} = useStore((state) => state);

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: [
			`categories-${activeCategory.id}`,
			`series-${activeSeries.id}`,
			`voice_acting_${voiceActing}`,
		],
		queryFn: () =>
			getFilteredGames(activeCategory.id, activeSeries.id, voiceActing),
	});

	useScrollDirection(inBottomSheet ? scrollContainerRef : undefined);

	function enterAllGamesSection() {
		// setCountButtonUpIsShown(true);
		setIsEnd(false);
	}

	function leaveAllGamesSection() {
		// setCountButtonUpIsShown(false);
		emptyCounter();
	}

	function handleOpenGameInfoBottomSheet(game) {
		setActiveGame(game);
		setGameInfoBottomSheetIsOpen(true);
	}

	function handleScroll() {
		const allGamesContTop =
			allGamesContRef.current?.getBoundingClientRect().top;
		const cardHeight = gameCardRef.current?.getBoundingClientRect().height + 16;

		const counterValue = (
			(allGamesContTop - window.innerHeight) /
			(cardHeight / 2)
		).toFixed(0);

		if (counterValue < 0) {
			setCounter(counterValue * -1);
		}
	}

	useEffect(() => {
		handleScroll();
		document
			.getElementById('main-sheet')
			.addEventListener('scroll', handleScroll);

		// Убираем слушатель события при размонтировании компонента
		// return () => {
		// 	if (inBottomSheet) {
		// 		document
		// 			.getElementById('main-sheet')
		// 			.removeEventListener('scroll', handleScroll);
		// 	}
		// };
	}, []);

	if (isSuccess) {
		content.current = data.results.map((game) => (
			<div className={cls.gameCarCont} key={game.id}>
				<MotionGameCard
					ref={gameCardRef}
					onClick={() => handleOpenGameInfoBottomSheet(game)}
					game={game}
					xs={game.compatibility === 'xbox_series_x_s'}
					gameTitle={game.title}
					gamePrice={game.price}
					subprice={game.subprice}
					imgSrc={game.image}
					rus={game.voice_acting === 'russian'}
				/>
			</div>
		));
	}

	if (isError) {
		content.current = <p>There is some error...</p>;
	}

	return (
		<>
			<section style={{ position: 'relative', zIndex: 1, minHeight: '100%' }}>
				<Loading loading={isLoading} />
				<div className='wrapper' style={{ opacity: isLoading ? 0 : 1 }}>
					{/* {activeCategory.name && (
						<div
							style={inBottomSheet && { marginTop: 0 }}
							className={cls.sectionHeader}>
							<h2 className='section-title'>
								{activeCategory.name}{' '}
								<span style={{ fontSize: '14px' }}>
									({data?.count} {numWordWithMemo})
								</span>
							</h2>
						</div>
					)} */}
					{!activeSeries && (
						<div className={cls.filterButtons}>
							<Button
								onClick={() => setSortIsOpen(true)}
								Icon={DropdownIcon}
								iconSize={16}>
								По умолчанию
							</Button>
							<Button
								onClick={() => setFiltersIsOpen(true)}
								Icon={FilterIcon}
								iconSize={16}>
								Все игры
							</Button>
						</div>
					)}
					<motion.div
						ref={allGamesContRef}
						style={{
							position: 'absolute',
							left: '0',
							top: '0px',
							height: inBottomSheet
								? 'calc(100% - 70px - 170px)'
								: 'calc(100% - 70px)',
							width: '100%',
						}}
						onViewportEnter={enterAllGamesSection}
						onViewportLeave={leaveAllGamesSection}
					/>
					<div className={cls.allGamesCont}>{content.current}</div>
				</div>

				<motion.div
					onViewportEnter={() => setIsEnd(true)}
					onViewportLeave={() => setIsEnd(false)}
					style={{ height: '0px' }}
				/>
			</section>
			<Modal
				className={inBottomSheet && cls.modal}
				isOpen={filtersIsOpen}
				setIsopen={setFiltersIsOpen}>
				<div className={cls.gameFilters}>
					<h3 className='section-title'>Фильтры</h3>
					<div className={cls.filters}>
						<FilterButton text={'Все игры'} isChecked={true} />
						<FilterButton text={'Полностью русские'} />
						<FilterButton text={'Версия для Series X/S'} />
						<FilterButton text={'Версия для Xbox One'} />
					</div>
				</div>
			</Modal>
			<Modal
				className={inBottomSheet && cls.modal}
				isOpen={filtersIsOpen}
				setIsopen={setFiltersIsOpen}>
				<div className={cls.gameFilters}>
					<h3 className='section-title'>Фильтры</h3>
					<div className={cls.filters}>
						<FilterButton text={'Все игры'} isChecked={true} />
						<FilterButton text={'Полностью русские'} />
						<FilterButton text={'Версия для Series X/S'} />
						<FilterButton text={'Версия для Xbox One'} />
					</div>
				</div>
			</Modal>
			<Modal
				className={inBottomSheet && cls.modal}
				isOpen={sortIsOpen}
				setIsopen={setSortIsOpen}>
				<div className={cls.gameFilters}>
					<h3 className='section-title'>Сортировка</h3>
					<div className={cls.filters}>
						<FilterButton text={'По умолчанию'} isChecked={true} />
						<FilterButton text={'По названию'} />
						<FilterButton text={'По алфавиту'} />
						<FilterButton text={'По дате релиза'} />
						<FilterButton text={'По популярности'} />
						<FilterButton text={'Сначала дешевые'} />
						<FilterButton text={'Сначала дорогие'} />
					</div>
				</div>
			</Modal>
		</>
	);
};

export default GamesFilteredBycategory;
