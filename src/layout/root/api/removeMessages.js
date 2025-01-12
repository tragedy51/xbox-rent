export async function removeMessages({ client_id, basket_id }) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/basket/remove-message/`,
		{
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				client_id,
				basket_id,
			}),
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
