import { IComment } from '../../types';
import { fetchComments } from './commentsThunks.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentsState {
  comments: IComment[];
  loading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const commentsReducer = commentsSlice.reducer;