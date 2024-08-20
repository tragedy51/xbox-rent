export async function checkoutBasket({ basketGamesId, telegramId }) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/order_checkout/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				telegram_id: telegramId,
				game_ids: basketGamesId,
			}),
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
