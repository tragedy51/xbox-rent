export async function getFilteredGames(categoryId) {
	let queries = '';

	queries += categoryId ? `categories=${categoryId}` : '';

	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/catalog/?${queries}`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
