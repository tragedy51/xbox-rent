export async function searchGames({ search }) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/catalog?search=${search}`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
