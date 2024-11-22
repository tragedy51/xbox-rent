import { useQuery } from '@tanstack/react-query';
import cls from './similar-games.module.css';
import { getSimilarGames } from './api/getSimilarGames';
import { useRef } from 'react';
import SectionWithSlide from '../../../../../../components/SectionWithSlide/SectionWithSlide';

const SimilarGames = ({ categoryId, currentGame }) => {
	const content = useRef();

	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: [`get-similar-games-${categoryId}`],
		queryFn: () => getSimilarGames(categoryId),
	});

	if (isLoading) {
		content.current = <p>Loading...</p>;
	}

	if (isError) {
		content.current = <p>Error</p>;
	}

	if (isSuccess) {
		content.current = (
			<SectionWithSlide sectionTitle={'Похожие игры'} slides={data.results} filterId={currentGame.id} />
		);
	}

	return (
		<section
			className={cls.similarGames}>
			<div style={{paddingBottom: '80px'}} className={cls.blurBg}>{content.current}</div>
		</section>
	);
};

export default SimilarGames;
