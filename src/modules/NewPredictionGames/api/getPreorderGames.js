export async function getPreorderGames() {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/catalog?pre_order=true&limit=30`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
