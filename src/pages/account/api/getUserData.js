export async function getUserData({ token, id }) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/clients/${id}`,
		{
			headers: {
				'x-client-hash': token,
			},
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}