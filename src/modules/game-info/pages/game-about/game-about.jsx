import { IphoneShareIcon } from '../../../../assets';
import SimilarGames from './components/similar-games/similar-games';
import cls from './game-about.module.css';

const GameAbout = ({ data, setBigImage }) => {
	const url = window.location.href;
	const text = `Check this out!`;

	const handleTelegramShare = () => {
		const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
			url
		)}&text=${encodeURIComponent(text)}`;
		window.open(telegramUrl, '_blank');
	};

	return (
		<>
			<div className='wrapper'>
				<div className={cls.gameTitle}>
					<img
						onClick={() => setBigImage(data.image)}
						src={data.image}
						alt=''
					/>
					<div>
						<h2>{data.title}</h2>
						<span>
							{new Date(data.release_date)
								.toLocaleDateString()
								.replace(/\//g, '.')}{' '}
							•{' '}
							{data.categories.map(
								(category, i, categories) =>
									`${category.name} ${i < categories.length - 1 ? '& ' : ''}`
							)}
						</span>
					</div>
				</div>
				<div className={cls.labelsCont}>
					<div className={cls.labels}>
						<div className={cls.label}>Xbox Live</div>
						<div className={cls.label}>4K</div>
						<div className={cls.label}>1 игрок</div>
						<div className={cls.label}>HDR</div>
					</div>
					{/* <button className={cls.sharebtnIcon}>
						<IphoneShareIcon width={25} height={25} />
					</button> */}
				</div>
				<p style={{ whiteSpace: 'pre-wrap' }} className={cls.gameInfoText}>
					{data.description}
				</p>
				<button onClick={handleTelegramShare} className={cls.sharebtn}>
					<IphoneShareIcon width={20} height={20} />
					Поделиться карточкой
				</button>
			</div>
			<SimilarGames categoryId={data.categories[0].id} />
		</>
	);
};

export default GameAbout;
