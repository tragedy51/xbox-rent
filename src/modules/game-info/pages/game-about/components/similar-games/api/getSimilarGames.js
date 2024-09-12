export async function getSimilarGames(categoryId) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/catalog/?categories=${categoryId}&limit=30`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
