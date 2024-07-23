import SearchInput from './UI/SearchInput/SearchInput';
import Button from '../../UI/Button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';

import cls from './HotNewGames.module.css';
import FireIcon from '../../assets/icons/fire-icon.svg?react';
import DropdownIcon from '../../assets/icons/dropdown-arrows-icon.svg?react';

const HotNewGames = () => {
	return (
		<section
			style={{
				backgroundImage: `url(
					'https://project-green.ru/pgstore/webapp/fastapi/app/games/9PLTKZZK35RF/images/tile.webp'
				)`,
			}}
			className={cls.hotNewGamesSection}>
			<div className={cls.blurBg}>
				<div className='wrapper'>
					<div className='wrapper'>
						<h3 className={`${cls.categoryTitle}`}>
							Аренда игр <span>(285 position)</span>
						</h3>
					</div>
					<div className={cls.input}>
						<SearchInput />
					</div>
					<div className='section-header'>
						<h3 className='section-title'>
							<FireIcon width={20} height={20} />
							Горячие новинки
						</h3>
						<Button Icon={DropdownIcon} iconSize={16}>
							За неделю
						</Button>
					</div>
				</div>
				<Swiper
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
							src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9PLTKZZK35RF/images/tile.webp'
							alt=''
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9PMPZZLKQM43/images/tile.webp'
							alt=''
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9N9H2HMFZKLM/images/tile.webp'
							alt=''
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9PJQMBMJ3154/images/tile.webp'
							alt=''
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	);
};

export default HotNewGames;
