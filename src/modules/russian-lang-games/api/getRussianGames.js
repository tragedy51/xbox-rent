export async function getRussianGames() {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/catalog/?voice_acting=russian&limit=30`
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
