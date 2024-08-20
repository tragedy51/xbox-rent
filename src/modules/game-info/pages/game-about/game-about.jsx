import cls from './game-about.module.css';

const GameAbout = ({ data }) => {
	return (
		<div className='wrapper'>
			<div className={cls.gameTitle}>
				<img src={data.image} alt='' />
				<div>
					<h2>{data.title}</h2>
					<span>
						{new Date(data.release_date).getFullYear()} •{' '}
						{data.categories.map(
							(category, i, categories) =>
								`${category.name} ${i < categories.length - 1 ? '& ' : ''}`
						)}
					</span>
				</div>
			</div>
			<div className={cls.labels}>
				<div className={cls.label}>Xbox Live</div>
				<div className={cls.label}>4K</div>
				<div className={cls.label}>1 игрок</div>
				<div className={cls.label}>HDR</div>
			</div>
			<p className={cls.gameInfoText}>{data.description}</p>
		</div>
	);
};

export default GameAbout;
