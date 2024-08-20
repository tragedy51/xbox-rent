export const categoriesSlice = (set) => ({
	activeCategory: { id: null, name: null },
	setActiveCategory: (id, name) =>
		set(() => ({ activeCategory: { id, name } })),
});
