import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHelpInfo } from '../../../api/api';

const initialState = {
  data: [],
  status: '',
};

export const asyncHelpInfo = createAsyncThunk<any, void, {}>(
  'help',
  async () => {
    try {
      const response = await getHelpInfo();
      return response.data;
    } catch (error) {
      console.log(error, 'error');
    }
  }
);

const helpInfoSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncHelpInfo.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(asyncHelpInfo.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(asyncHelpInfo.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const helpInfo = helpInfoSlice.actions;
export default helpInfoSlice.reducer;
