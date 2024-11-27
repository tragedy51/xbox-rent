import { useEffect } from 'react';
import { useStore } from '../../store';
import gifLoading from '../../assets/gifs/video-ezgif.com-gif-maker.gif';

const BuyGames = ({ title }) => {
	const { setLoading } = useStore((state) => state);

	useEffect(() => {
		setLoading(false);
	}, [setLoading]);

	return (
		<section style={{ padding: '20px 0 28px' }} className='wrapper'>
			<h2 className='category-title'>{title}</h2>
			<div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)'}}>
				<img style={{ width: '50px', margin: '0 auto' }} src={gifLoading} alt='' />
				<h3 style={{ paddingTop: '10px' }}>В разработке..</h3>
			</div>
		</section>
	);
};

export default BuyGames;
