import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFavorite {
  id?: number;
}

const initialState = {
  favoriteCoupons: localStorage.getItem('favoriteItems')
    ? JSON.parse(localStorage.getItem('favoriteItems') || '')
    : ([] as IFavorite[]),

  authFavoriteCoupons: localStorage.getItem('favoriteItems')
    ? JSON.parse(localStorage.getItem('favoriteItems') || '')
    : ([] as IFavorite[]),
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IFavorite>) => {
      const user =
        localStorage.getItem('currentUser') &&
        JSON.parse(localStorage.getItem('currentUser') || '');

      if (!user) {
        const myFavorites = action.payload;
        state.favoriteCoupons.push(myFavorites);
        localStorage.setItem(
          'favoriteItems',
          JSON.stringify(state.favoriteCoupons)
        );
      }

      if (user) {
        const myFavorites = action.payload;
        state.authFavoriteCoupons.push(myFavorites);
        localStorage.setItem(
          'AuthFavoriteItems',
          JSON.stringify(state.authFavoriteCoupons)
        );
      }
    },
    removeFromFavorite: (state, action) => {
      // console.log();

      const user =
        localStorage.getItem('currentUser') &&
        JSON.parse(localStorage.getItem('currentUser') || '');

      if (!user) {
        state.favoriteCoupons = state.favoriteCoupons.filter(
          (item: any) => item.id !== action.payload.id
        );
        localStorage.setItem(
          'favoriteItems',
          JSON.stringify(state.favoriteCoupons)
        );
      }

      if (user) {
        state.authFavoriteCoupons = state.authFavoriteCoupons.filter(
          (item: any) => item.id !== action.payload.id
        );
        localStorage.setItem(
          'AuthFavoriteItems',
          JSON.stringify(state.authFavoriteCoupons)
        );
        localStorage.setItem(
          'favoriteItems',
          JSON.stringify(state.authFavoriteCoupons)
        );
      }
    },
    resetFavorites: (state) => {
      state.favoriteCoupons = [];
      state.authFavoriteCoupons = [];

      localStorage.removeItem('favoriteItems');
      localStorage.removeItem('AuthFavoriteItems');
    },
  },
});

export const { addFavorite, removeFromFavorite, resetFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
