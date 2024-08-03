import { useStore } from '../../store';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';
import cls from './game-info.module.css';

export const GameInfo = () => {
	const { gameInfoBottomSheetIsOpen, setGameInfoBottomSheetIsOpen } = useStore(
		(state) => state
	);

	return (
		<CustomBottomSheet
			isOpen={gameInfoBottomSheetIsOpen}
			setIsopen={setGameInfoBottomSheetIsOpen}>
			<div className={cls.gameInfoCont}>
				<img
					src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9N2ZDN7NWQKV/images/hero.webp'
					alt=''
				/>
				<header className={cls.gameInfoHeader}>
					<div className='wrapper'>
						<p>Об игре</p>
					</div>
				</header>
				<main className={cls.gameInfoMain}>
					<div className='wrapper'>
						<div className={cls.gameTitle}>
							<img
								src='https://project-green.ru/pgstore/webapp/fastapi/app/games/9N2ZDN7NWQKV/images/hero.webp'
								alt=''
							/>
							<div>
								<h2>Forza Horizon 4: ultimate-издание</h2>
								<span>2018 • Racing & flying</span>
							</div>
						</div>
						<div className={cls.labels}>
							<div className={cls.label}>Xbox Live</div>
							<div className={cls.label}>4K</div>
							<div className={cls.label}>1 игрок</div>
							<div className={cls.label}>HDR</div>
						</div>
						<p className={cls.gameInfoText}>
							Включает в себя сюжетный режим Red Dead Redemption 2 и Red Dead
							Online.
							<br /> <br />
							Игра Red Dead Redemption 2, удостоившаяся более 175 наград в
							номинации «Игра года» и более 250 высших баллов от игровых
							изданий, – это грандиозное повествование о чести и преданности на
							заре современной эпохи.
							<br /> <br />
							Америка, 1899 год. Артур Морган и другие подручные Датча ван дер
							Линде вынуждены пуститься в бега. Их банде предстоит участвовать в
							кражах, грабежах и перестрелках в самом сердце Америки.
						</p>
					</div>
				</main>
			</div>
		</CustomBottomSheet>
	);
};
