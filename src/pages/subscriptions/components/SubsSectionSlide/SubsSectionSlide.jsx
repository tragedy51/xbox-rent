import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './style.module.css';
import GameCard from '../../../../components/GameCard/GameCard';
import { num_word } from '../../../../helpers';
import { BasketIcon, XboxIcon } from '../../../../assets';
import Button from '../../../../UI/Button/Button';
import { useMutation } from '@tanstack/react-query';
import { addSubToBasket } from '../../api/addSubToBasket';
import { useStore } from '../../../../store';

const SubsSectionSlide = ({
	slides,
	sectionTitle,
	slideImg,
	additionalInfo,
	sectionIcon,
}) => {
	const { basketId, changeXsIsOpen, setXsText } = useStore((state) => state);

	const { mutate } = useMutation({
		mutationFn: addSubToBasket,
	});

	function handleAddSub(period_id) {
		mutate({ basket_id: basketId, period_id });
	}

	function handleOpenInfo() {
		changeXsIsOpen(true);
		setXsText(additionalInfo);
	}

	return (
		<>
			<div className={`wrapper section-header`}>
				<h3 style={{ whiteSpace: 'break-spaces' }} className='section-title'>
					{sectionIcon ? (
						<img
							className={cls.sectionIcon}
							style={{ width: '24px', height: '24px' }}
							src={sectionIcon}
							alt=''
						/>
					) : (
						<div className={cls.sectionIcon}>
							<XboxIcon />
						</div>
					)}
					{`${sectionTitle}`}
				</h3>
				{additionalInfo && (
					<Button onClick={handleOpenInfo} className={cls.infoBtn}>
						!
					</Button>
				)}
			</div>
			<div>
				<Swiper
					className={`swiper swiper-initialized swiper-horizontal ${cls.slider}`}
					style={{
						padding: '0 1rem',
					}}
					spaceBetween={15}
					slidesPerView={2.3}>
					{slides.map((subs) => (
						<SwiperSlide key={subs.id}>
							<div style={{ position: 'relative' }}>
								<GameCard
									imgSrc={slideImg}
									gameTitle={`${subs.duration_months} ${num_word(
										subs.duration_months,
										['месяц', 'месяца', 'месяцев']
									)}`}
									gamePrice={subs.period_price}
									subprice={subs.period_subprice}
									size='md'
								/>
								<div style={{ position: 'absolute', top: '5px', right: '5px' }}>
									<Button onClick={() => handleAddSub(subs.id)}>
										<BasketIcon />
									</Button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};

export default SubsSectionSlide;
