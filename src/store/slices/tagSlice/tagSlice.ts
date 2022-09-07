import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubtitleTags } from '../../../api/api';

const initialState = {
  data: [],
  status: '',
};

export const asyncSubtitleTags = createAsyncThunk<any, void, {}>(
  'tags',
  async () => {
    try {
      const response = await getSubtitleTags();
      return response.data;
    } catch (error) {
      console.log(error, 'error');
    }
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncSubtitleTags.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(asyncSubtitleTags.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(asyncSubtitleTags.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const subtitleTags = tagsSlice.actions;
export default tagsSlice.reducer;
