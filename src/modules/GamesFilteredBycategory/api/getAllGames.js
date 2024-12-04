export async function getFilteredGames(categoryId, serieId, voiceActing, page) {
	let queries = '';

	queries += categoryId
		? `categories=${categoryId}`
		: serieId
		? `series=${serieId}`
		: '';

	const response = await fetch(
		`${
			import.meta.env.VITE_API_URL
		}/catalog/?${queries}&voice_acting=${voiceActing}&limit=10&offset=${
			(page - 1) * 10
		}`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
