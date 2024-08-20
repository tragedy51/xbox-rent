export async function getAllGames(sortType, dateFilter) {
	let queries = '';

	if (sortType) {
		queries += `ordering=${sortType}`;
	}

	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/catalog/?${queries}&release_date_period=${dateFilter}`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
