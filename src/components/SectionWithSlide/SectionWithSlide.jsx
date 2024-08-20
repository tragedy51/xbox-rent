import { Swiper, SwiperSlide } from 'swiper/react';
import GameCard from '../GameCard/GameCard';

import Button from '../../UI/Button/Button';
import DropdownIcon from '../../assets/icons/dropdown-arrows-icon.svg?react';
import cls from './SectionWithSlide.module.css';

const SectionWithSlide = ({
	sectionTitle,
	SectionIcon,
	slides,
	iconSize = 24,
	withFilter = false,
	bigCards = false,
}) => {
	return (
		<>
			<div className={`wrapper section-header`}>
				<h3 className='section-title'>
					<SectionIcon width={iconSize} height={iconSize} /> {sectionTitle}
				</h3>
				{withFilter && (
					<Button Icon={DropdownIcon} iconSize={16}>
						За неделю
					</Button>
				)}
			</div>
			<div className='wrapper-left'>
				<Swiper
					className={`swiper swiper-initialized swiper-horizontal ${cls.slider}`}
					spaceBetween={20}
					slidesPerView={2.3}>
					{slides.map((slide) => (
						<SwiperSlide key={slide.id}>
							<GameCard
								game={slide}
								xs={slide.xs}
								imgSrc={slide.imgSrc}
								gameTitle={slide.gameTitle}
								gamePrice={slide.gamePrice}
								gameDiscountPrice={slide.gameDiscountPrice}
								preOrder={slide.preOrder}
								size={bigCards ? 'lg' : 'md'}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};

export default SectionWithSlide;
