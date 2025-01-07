import { useEffect } from 'react';
import { useStore } from '../../store';
import gifLoading from '../../assets/gifs/video-ezgif.com-gif-maker.gif';
import cls from './style.module.css';
import Button from '../../UI/Button/Button';
import { getButtonInfoById } from '../../layout/root/api/getButtonInfoById';
import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';

const BuyGames = ({ title }) => {
	const { setLoading } = useStore((state) => state);

	const {
		data: buttonInfo,
		isSuccess: buttonInfoIsSuccess,
		isLoading,
		isError
	} = useQuery({
		queryKey: ['subs-info-button'],
		queryFn: () => getButtonInfoById(3),
	});

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
		} else if (buttonInfoIsSuccess) {
			setLoading(false);
		}
	}, [buttonInfoIsSuccess, isLoading, setLoading]);

	return (
		<section
			style={{ padding: '20px 0 28px' }}
			className={`wrapper ${cls.buyGamesSection}`}>
			<h2 className='category-title'>{title}</h2>
			<div>
				<img
					style={{ width: '50px', margin: '0 auto' }}
					src={gifLoading}
					alt=''
				/>
				<h3
					style={{
						paddingTop: '10px',
						fontWeight: '400',
						textAlign: 'center',
					}}>
					В разработке..
				</h3>
			</div>
			{buttonInfoIsSuccess && (
				<div className={cls.infoWindow}>
					<div className={cls.mirror}>
						<h3 style={{ textAlign: 'center' }}>{buttonInfo.description}</h3>
						<p className='text'>{parse(buttonInfo.text)}</p>
					</div>
					{buttonInfoIsSuccess && (
						<a href='https://t.me/monsterjamm'>
							<Button className={cls.tgButton}>{buttonInfo.title}</Button>
						</a>
					)}
					{isError && <p>Произошла ошибка при загрузке кнопки</p>}
				</div>
			)}
		</section>
	);
};

export default BuyGames;
