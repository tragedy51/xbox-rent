import SearchInput from './UI/SearchInput/SearchInput';

import cls from './HotNewGames.module.css';
import FireIcon from '../../assets/icons/fire-icon.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';

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
					<div className={cls.input}>
						<SearchInput />
					</div>
					<h3 className='section-title'>
						<FireIcon width={20} height={20} />
						Горячие новинки
					</h3>
				</div>
				<Swiper
					effect={'coverflow'}
					slidesPerView={1.4}
					centeredSlides={true}
					loop={true}
					modules={[EffectCoverflow, Navigation]}>
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
