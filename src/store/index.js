import { create } from 'zustand';
import { counterSlice } from '../modules/AllGames/store';
import { basketSlice } from '../modules/BasketCard/store/basket-slice';
import { layoutSlice } from '../layout/store';
import { categoriesSlice } from '../modules/Categories/store/categories-slice';
import { filterSlice } from '../filters/filters-slice';
import { userSlice } from './userSlice';

export const useStore = create((...a) => ({
	...counterSlice(...a),
	...basketSlice(...a),
	...layoutSlice(...a),
	...categoriesSlice(...a),
	...filterSlice(...a),
	...userSlice(...a),
}));
