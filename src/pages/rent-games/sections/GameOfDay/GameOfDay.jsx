import { useQuery } from '@tanstack/react-query';
import GameCard from '../../../../components/GameCard/GameCard';
import cls from './GameOfDay.module.css';
import { getRecommendedGame } from '../../../../modules/BasketCard/api/getRecommendedGame';
import { Icon } from '@iconify/react/dist/iconify.js';

const GameOfDay = () => {
	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['get-recommended-game'],
		queryFn: getRecommendedGame,
	});

	if (isLoading) {
		return (
			<Icon
				width={55}
				style={{ display: 'block', margin: 'auto' }}
				icon='eos-icons:three-dots-loading'
			/>
		);
	}

	return (
		<section className='wrapper'>
			<div className={cls.blurBg}>
				<div className='section-header'>
					<h3 className='section-title'>Игра дня</h3>
				</div>
				<GameCard
					release_date={data.release_date}
					preOrder={data.pre_order}
					// onClick={() => handleOpenGameInfoBottomSheet(game)}
					game={data}
					xs={data.compatibility === 'xbox_series_x_s'}
					gameTitle={data.title}
					gamePrice={data.price}
					subprice={data.subprice}
					imgSrc={'http://api.xbox-rent.ru' + data.image}
					lang={data.voice_acting}
					in_game_pass={data.in_game_pass}
				/>
			</div>
		</section>
	);
};

export default GameOfDay;
