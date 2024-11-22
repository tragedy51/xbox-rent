import { useQuery } from '@tanstack/react-query';
import { useStore } from '../../store';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';
import cls from './basket-card.module.css';
import { BasketGameCard } from './components';
import { getRecommendedGame } from './api/getRecommendedGame';
import { useRef } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getAndCreateBasket } from '../../layout/root/api/getAndCreateBasket';
import WebApp from '@twa-dev/sdk';

export const BasketCard = ({ adjustPosition }) => {
	const { basketBottomSheet, setBasketBottomSheet } = useStore(
		(state) => state
	);

	const content = useRef(null);
	const basketGamesContent = useRef(null);

	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['get-recommended-game'],
		queryFn: getRecommendedGame,
	});

	const {
		data: basketGames,
		isLoading: basketGamesIsLoading,
		isSuccess: basketGamesIsSuccess,
		isError: basketGamesIsError,
	} = useQuery({
		queryKey: ['create-basket'],
		queryFn: () =>
			getAndCreateBasket({
				id: WebApp?.initDataUnsafe?.user?.id || 1147564292,
			}),
	});

	if (isLoading) {
		content.current = (
			<Icon
				width={55}
				style={{ display: 'block', margin: 'auto' }}
				icon='eos-icons:three-dots-loading'
			/>
		);
	}
	if (basketGamesIsLoading) {
		basketGamesContent.current = (
			<Icon
				width={55}
				style={{ display: 'block', margin: 'auto' }}
				icon='eos-icons:three-dots-loading'
			/>
		);
	}

	if (isSuccess) {
		content.current = (
			<BasketGameCard
				recommendation={true}
				key={data.id}
				game={{ ...data, image: 'http://api.xbox-rent.ru' + data.image }}
			/>
		);
	}
	if (basketGamesIsSuccess) {
		basketGamesContent.current =
			basketGames.items === 0 ? (
				<p>No games</p>
			) : (
				<div className={cls.BasketCard}>
					{basketGames.items.map((game) => (
						<BasketGameCard key={game.id} game={game} />
					))}
					<div className={cls.priceCont}>
						{/* {basketPrice !== basketDiscountPrice && (
							<p className={cls.discount}>{basketPrice} ₽</p>
						)} */}
						<p className={cls.price}>{basketGames.amount} ₽</p>
					</div>
				</div>
			);
	}

	if (isError) {
		content.current = <p>При загрузке игры произошла ошибка</p>;
	}
	if (basketGamesIsError) {
		basketGamesContent.current = <p>При загрузке игр произошла ошибка</p>;
	}

	return (
		<>
			<CustomBottomSheet
				adjustPosition={adjustPosition}
				isOpen={basketBottomSheet}
				setIsopen={setBasketBottomSheet}>
				<section className='wrapper'>
					<div className='section-header'>
						<h2 style={{ marginTop: '10px' }} className='section-title'>
							Корзина
						</h2>
					</div>
					{basketGamesContent.current}
					<div className={cls.recommendedGame}>
						<h2 style={{ marginBottom: '20px' }} className='section-title'>
							Мы рекомендуем поиграть
						</h2>
						{content.current}
					</div>
				</section>
			</CustomBottomSheet>
		</>
	);
};
