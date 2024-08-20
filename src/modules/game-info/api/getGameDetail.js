export async function getGameDetail(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)

    const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}