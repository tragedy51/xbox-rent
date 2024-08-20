import cls from './game-videos.module.css';

const GameVideos = ({ videos }) => {
	return (
		<div className='wrapper'>
			<div className={cls.allVideos}>
				{videos.map((video) => (
					<video key={video.id} src={video.url}></video>
				))}
			</div>
		</div>
	);
};

export default GameVideos;
