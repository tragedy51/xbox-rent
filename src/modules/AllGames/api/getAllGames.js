export async function getAllGames(sortType, page) {
	let queries = '';

	if (sortType) {
		queries += `ordering=${sortType}`;
	}

	const response = await fetch(
		`${
			import.meta.env.VITE_API_URL
		}/catalog/?${queries}&limit=10&offset=${(page - 1) * 10}`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
