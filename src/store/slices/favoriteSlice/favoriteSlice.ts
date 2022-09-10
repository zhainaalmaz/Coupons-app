import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFavorite {
  id?: number;
}
const initialState = {
  favoriteCoupons: localStorage.getItem('favoriteItems')
    ? JSON.parse(localStorage.getItem('favoriteItems') || '')
    : ([] as IFavorite[]),
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IFavorite>) => {
      const myFavorites = action.payload;
      state.favoriteCoupons.push(myFavorites);
      localStorage.setItem(
        'favoriteItems',
        JSON.stringify(state.favoriteCoupons)
      );
    },
    removeFromFavorite: (state, action) => {
      state.favoriteCoupons = state.favoriteCoupons.filter(
        (item: any) => item.id !== action.payload.id
      );
      localStorage.setItem(
        'favoriteItems',
        JSON.stringify(state.favoriteCoupons)
      );
    },
  },
});

export const { addFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
