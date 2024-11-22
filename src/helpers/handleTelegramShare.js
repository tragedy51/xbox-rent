export const handleTelegramShare = (data) => {
	const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
		'https://t.me/XboxRent_Bot'
	)}&text=${encodeURIComponent(data.title)}`;
	window.open(telegramUrl, '_blank');
};
