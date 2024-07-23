import { Swiper, SwiperSlide } from 'swiper/react';
import GameCard from '../GameCard/GameCard';

import Button from '../../UI/Button/Button';
import DropdownIcon from '../../assets/icons/dropdown-arrows-icon.svg?react';

const SectionWithSlide = ({
	sectionTitle,
	SectionIcon,
	slides,
	iconSize = 24,
	withFilter = false,
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
				<Swiper spaceBetween={20} slidesPerView={2.3}>
					{slides.map((slide) => (
						<SwiperSlide key={slide.id}>
							<GameCard
								imgSrc={slide.imgSrc}
								gameTitle={slide.gameTitle}
								gamePrice={slide.gamePrice}
								gameDiscountPrice={slide.gameDiscountPrice}
								preOrder={slide.preOrder}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};

export default SectionWithSlide;
