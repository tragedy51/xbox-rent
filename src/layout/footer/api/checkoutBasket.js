export async function checkoutBasket({ telegramId, basket_id }) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/order_checkout/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				telegram_id: telegramId,
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
