export async function getButtonInfoById(id) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/template_page/${id}/`
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return result;
}
