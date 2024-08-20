// import SearchInput from './UI/SearchInput/SearchInput';
import Button from '../../UI/Button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { useMemo, useRef, useState } from 'react';

import cls from './HotNewGames.module.css';
import FireIcon from '../../assets/icons/fire-icon.svg?react';
import DropdownIcon from '../../assets/icons/dropdown-arrows-icon.svg?react';
import SliderNextIcon from '../../assets/icons/slider-next-icon.svg?react';
import SliderPrevIcon from '../../assets/icons/slider-prev-icon.svg?react';
import SearchIcon from '../../assets/icons/search-icon.svg?react';
import { num_word } from '../../helpers';
import { Modal, FilterButton } from '../../UI';
import { useStore } from '../../store';

const HotNewGames = () => {
	const swiperRef = useRef(null);	

	const { setDateFilter, dateFilter, gamesCount } = useStore((state) => state);
	const [filtersByDateIsOpen, setFiltersByDateIsOpen] = useState(false);

	const handlePrev = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	const handleNext = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slideNext();
		}
	};

	const numWord = useMemo(() => {
		return num_word(gamesCount, ['позиция', 'позиции', 'позиций']);
	}, [gamesCount]);

	return (
		<>
			<section
				style={{
					backgroundImage: `url(
					'https://project-green.ru/pgstore/webapp/fastapi/app/games/9PLTKZZK35RF/images/tile.webp'
				)`,
				}}
				className={cls.hotNewGamesSection}>
				<div className={cls.blurBg}>
					<div className='wrapper'>
						<div className={cls.titleCont}>
							<h3 className={`${cls.categoryTitle}`}>
								Аренда игр <span>(0 {numWord})</span>
							</h3>
							<Button component='link' to={'/search'} className={cls.searchBtn}>
								<SearchIcon width={20} height={20} />
							</Button>
						</div>
						<div className='section-header'>
							<h3 style={{ marginBottom: 0 }} className='section-title'>
								<FireIcon width={20} height={20} />
								Популярные игры
							</h3>
							<Button
								onClick={() => setFiltersByDateIsOpen(true)}
								className={cls.filterBtn}
								Icon={DropdownIcon}
								iconSize={16}>
								{dateFilter.text}
							</Button>
						</div>
					</div>
					<div className={cls.swiperCont}>
						<Swiper
							ref={swiperRef}
							effect={'coverflow'}
							slidesPerView={1.4}
							centeredSlides={true}
							autoplay={{
								delay: 2000,
							}}
							loop={true}
							modules={[EffectCoverflow, Navigation, Autoplay]}>
							<SwiperSlide>
								<img
									className={cls.sliderImg}
									src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9PLTKZZK35RF/images/tile.webp'
									alt=''
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									className={cls.sliderImg}
									src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9PMPZZLKQM43/images/tile.webp'
									alt=''
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									className={cls.sliderImg}
									src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9N9H2HMFZKLM/images/tile.webp'
									alt=''
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									className={cls.sliderImg}
									src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9PJQMBMJ3154/images/tile.webp'
									alt=''
								/>
							</SwiperSlide>
						</Swiper>
						<div className={cls.customSliderNav}>
							<button className={cls.prevBtn} onClick={handlePrev}>
								<SliderPrevIcon width={36} height={36} fill={'#e5e7eba6'} />
							</button>
							<button className={cls.nextBtn} onClick={handleNext}>
								<SliderNextIcon width={36} height={36} fill={'#e5e7eba6'} />
							</button>
						</div>
					</div>
				</div>
			</section>
			<Modal isOpen={filtersByDateIsOpen} setIsopen={setFiltersByDateIsOpen}>
				<div className={cls.filterByDate}>
					<h3 className='section-title'>Сортировка</h3>
					<div className={cls.filters}>
						<FilterButton
							text={'За неделю'}
							onClick={() =>
								setDateFilter({ filter: 'week', text: 'За неделю' })
							}
							isChecked={dateFilter.filter === 'week'}
						/>
						<FilterButton
							text={'За месяц'}
							onClick={() =>
								setDateFilter({ filter: 'month', text: 'За месяц' })
							}
							isChecked={dateFilter.filter === 'month'}
						/>
						<FilterButton
							text={'За пол года'}
							onClick={() =>
								setDateFilter({ filter: 'half-year', text: 'За пол года' })
							}
							isChecked={dateFilter.filter === 'half-year'}
						/>
						<FilterButton
							text={'За все время'}
							onClick={() =>
								setDateFilter({ filter: 'all-time', text: 'За все время' })
							}
							isChecked={dateFilter.filter === 'all-time'}
						/>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default HotNewGames;
