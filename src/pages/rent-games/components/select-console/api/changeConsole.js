export async function changeConsole({ token, id, consoleType }) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/clients/${id}/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-client-hash': token,
			},
			body: JSON.stringify({
				console: consoleType,
			}),
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
