import GameCard from '../../components/GameCard/GameCard';
import Button from '../../UI/Button/Button';
import { motion } from 'framer-motion';

import cls from './AllGames.module.css';
import FilterIcon from '../../assets/icons/filter-icon.svg?react';
// import DropdownIcon from '../../assets/icons/dropdown-arrows-icon.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import { useQuery } from '@tanstack/react-query';
import { getAllGames } from './api/getAllGames';
import { FilterButton, Modal } from '../../UI';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useShallow } from 'zustand/react/shallow';
import {
	AlphabetIcon,
	DiscountIcon,
	DollarincircleIcon,
	KeyboardIcon,
	StarIcon,
	TimeIcon,
	TwoArrowsIcon,
} from '../../assets';
import { Icon } from '@iconify/react/dist/iconify.js';

const MotionGameCard = motion(GameCard);

const AllGames = ({ inBottomSheet, scrollContainerRef }) => {
	const [filtersIsOpen, setFiltersIsOpen] = useState(false);
	const [sortIsOpen, setSortIsOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalGames, setTotalGames] = useState(0);
	const content = useRef(null);

	const {
		direction,
		increaseCounter,
		decreaseCounter,
		emptyCounter,
		setGameInfoBottomSheetIsOpen,
		setCountButtonUpIsShown,
		setActiveGame,
		setIsEnd,
		setGamesCount,
		gamesCount,
	} = useStore(useShallow((state) => state));

	const [sortType, setSortType] = useState({
		type: '',
		text: 'По умолчанию',
		icon: TwoArrowsIcon,
	});

	const { data, isSuccess, isError, isFetching } = useQuery({
		queryKey: [`all-games-${page}`, `all-games-sorted-${sortType.type}`],
		queryFn: () => getAllGames(sortType.type, page),
	});

	useScrollDirection(inBottomSheet ? scrollContainerRef : undefined);

	function handleCardLeaveViewport() {
		if (direction === 'up') {
			decreaseCounter();
		}
	}

	function handleCardEnterViewport() {
		if (direction === 'down') {
			increaseCounter();
		}
	}

	function enterAllGamesSection() {
		setCountButtonUpIsShown(true);
		setIsEnd(false);
	}

	function leaveAllGamesSection() {
		setCountButtonUpIsShown(false);
		emptyCounter();
	}

	function handleOpenGameInfoBottomSheet(game) {
		setActiveGame(game);
		setGameInfoBottomSheetIsOpen(true);
	}

	useEffect(() => {
		if (gamesCount !== data?.count) {
			setGamesCount(data?.count);
		}
	}, [data?.count, gamesCount, setGamesCount]);

	const allGames = useRef([]);

	useEffect(() => {
		allGames.current = [];
	}, [sortType]);

	useEffect(() => {
		if (data) {
			allGames.current = [...allGames.current, ...data.results];
		}
	}, [data]);

	useEffect(() => {
		if (isSuccess) {
			setTotalGames(data.count);
		}
	}, [data?.count, isSuccess]);

	function changePage() {
		const maxPageCount = Math.ceil(totalGames / 10);

		if (page < maxPageCount) {
			setPage((prev) => prev + 1);
		}
	}

	function handleSortGames(sort) {
		setPage(1);
		setSortType(sort);
	}

	if (isSuccess) {
		content.current = allGames.current.map((game, i) => (
			<div className={cls.gameCarCont} key={game.id}>
				<MotionGameCard
					release_date={game.release_date}
					preOrder={game.pre_order}
					onClick={() => handleOpenGameInfoBottomSheet(game)}
					game={game}
					xs={game.compatibility === 'xbox_series_x_s'}
					gameTitle={game.title}
					gamePrice={game.price}
					subprice={game.subprice}
					imgSrc={game.image}
					rus={game.voice_acting === 'russian'}
				/>
				<motion.div
					onViewportEnter={handleCardEnterViewport}
					onViewportLeave={handleCardLeaveViewport}
					style={
						i % 2 === 0
							? { height: 0 }
							: { height: 0, transform: 'translateY(-70px)' }
					}
				/>
			</div>
		));
	}

	if (isError) {
		content.current = <p>There is some error...</p>;
	}

	return (
		<>
			<section style={{ position: 'relative', zIndex: 1 }}>
				<div className='wrapper'>
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
					<div className={cls.filterButtons}>
						<Button
							onClick={() => setSortIsOpen(true)}
							Icon={sortType.icon}
							iconSize={16}>
							{sortType.text}
						</Button>
						<Button
							onClick={() => setFiltersIsOpen(true)}
							Icon={FilterIcon}
							iconSize={16}>
							Все игры
						</Button>
					</div>
					<motion.div
						style={{
							position: 'absolute',
							left: '0',
							top: '170px',
							height: inBottomSheet
								? 'calc(100% - 70px - 170px)'
								: 'calc(100% - 70px)',
							width: '100%',
						}}
						onViewportEnter={enterAllGamesSection}
						onViewportLeave={leaveAllGamesSection}
					/>
					<div className={cls.allGamesCont}>{content.current}</div>
					{isFetching && (
						<Icon
							style={{ margin: '0 auto', display: 'block' }}
							width={55}
							icon='eos-icons:three-dots-loading'
						/>
					)}
					<motion.div
						style={{
							position: 'absolute',
							bottom: '-100px',
							width: '100%',
							height: '1px',
							background: 'transparent',
						}}
						onViewportEnter={changePage}
					/>
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
						<FilterButton
							onClick={(e) => e.stopPropagation()}
							text={'Все игры'}
							isChecked={true}
						/>
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
						<FilterButton
							onClick={() =>
								handleSortGames({
									type: '',
									text: 'По умолчанию',
									icon: TwoArrowsIcon,
								})
							}
							text={'По умолчанию'}
							isChecked={sortType.type === ''}
							Icon={TwoArrowsIcon}
						/>
						<FilterButton
							onClick={() =>
								handleSortGames({
									type: 'title',
									text: 'A..z по убыванию',
									icon: AlphabetIcon,
								})
							}
							text={'A..z по убыванию'}
							isChecked={sortType.type === 'title'}
							Icon={AlphabetIcon}
						/>
						<FilterButton
							onClick={() =>
								handleSortGames({
									type: '-title',
									text: 'Z..a по возрастанию',
									icon: KeyboardIcon,
								})
							}
							text={'Z..a по возрастанию'}
							isChecked={sortType.type === '-title'}
							Icon={KeyboardIcon}
						/>
						<FilterButton
							onClick={() =>
								handleSortGames({
									type: '-release_date',
									text: 'Новые игры',
									icon: StarIcon,
								})
							}
							text={'Новые игры'}
							isChecked={sortType.type === '-release_date'}
							Icon={StarIcon}
						/>
						<FilterButton
							onClick={() =>
								handleSortGames({
									type: 'release_date',
									text: 'Старые игры',
									icon: TimeIcon,
								})
							}
							text={'Старые игры'}
							isChecked={sortType.type === 'release_date'}
							Icon={TimeIcon}
						/>
						<FilterButton
							onClick={() =>
								handleSortGames({
									type: 'price',
									text: 'Сначала дешевые',
									icon: DiscountIcon,
								})
							}
							text={'Сначала дешевые'}
							isChecked={sortType.type === 'price'}
							Icon={DiscountIcon}
						/>
						<FilterButton
							onClick={() =>
								handleSortGames({
									type: '-price',
									text: 'Сначала дорогие',
									icon: DollarincircleIcon,
								})
							}
							text={'Сначала дорогие'}
							isChecked={sortType.type === '-price'}
							Icon={DollarincircleIcon}
						/>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AllGames;
