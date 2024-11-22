export const userSlice = (set) => ({
	isAdmin: false,
	setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
});
