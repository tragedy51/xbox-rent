import { useQuery } from '@tanstack/react-query';
import GameCard from '../../../../components/GameCard/GameCard';
import cls from './GameOfDay.module.css';
import { getRecommendedGame } from '../../../../modules/BasketCard/api/getRecommendedGame';
import { Icon } from '@iconify/react/dist/iconify.js';
import Button from '../../../../UI/Button/Button';
import { useStore } from '../../../../store';
import { DiscountIcon } from '../../../../assets';
import { getButtonInfoById } from '../../../../layout/root/api/getButtonInfoById';

const GameOfDay = () => {
	const {
		changeXsIsOpen,
		setXsText,
		setActiveGame,
		setGameInfoBottomSheetIsOpen,
		setXsTitle,
	} = useStore((state) => state);

	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['get-recommended-game'],
		queryFn: getRecommendedGame,
	});

	const { data: buttonInfo, isSuccess: buttonInfoIsSuccess } = useQuery({
		queryKey: ['game-of-day-button'],
		queryFn: () => getButtonInfoById(2),
	});

	function handleOpenInfo() {
		if (buttonInfoIsSuccess) {
			changeXsIsOpen(true);
			setXsTitle(buttonInfo.description);
			setXsText(buttonInfo.text);
		}
	}

	function handleOpenGameInfoBottomSheet(game) {
		setActiveGame(game);
		setGameInfoBottomSheetIsOpen(true);
	}

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
					<h3 className='section-title'>
						<DiscountIcon />
						Игра дня в пол цены
					</h3>
					{buttonInfoIsSuccess && (
						<Button onClick={handleOpenInfo} className={cls.infoBtn}>
							{buttonInfo.title}
						</Button>
					)}
				</div>
				<GameCard
					release_date={data.release_date}
					preOrder={data.pre_order}
					onClick={() => handleOpenGameInfoBottomSheet(data)}
					game={data}
					xs={data.compatibility === 'xbox_series_x_s'}
					gameTitle={data.title}
					gamePrice={data.price}
					subprice={data.original_price}
					imgSrc={data.image}
					lang={data.voice_acting}
					in_game_pass={data.in_game_pass}
					isDayGame
				/>
			</div>
		</section>
	);
};

export default GameOfDay;
