import { useEffect } from 'react';
import { useStore } from '../../store';

const BuyGames = () => {
	const { setLoading } = useStore((state) => state);

	useEffect(() => {
		setLoading(false);
	}, [setLoading]);

	return (
		<h2 className='wrapper' style={{ paddingTop: '10px' }}>
			В разработке
		</h2>
	);
};

export default BuyGames;
