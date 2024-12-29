export async function addGameToBasket({ product_id, basket_id, game }) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/basket/add_product/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				product_id,
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
