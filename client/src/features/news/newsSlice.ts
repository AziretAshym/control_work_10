import { INews } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNews, fetchNews } from './newsThunks';
import { RootState } from '../../app/store.ts';

interface NewsState {
  news: INews[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  fetchLoading: false,
  createLoading: false,
}

export const selectNews = (state: RootState) => state.news.news;
export const selectFetchLoading = (state: RootState) => state.news.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload: news }) => {
        state.fetchLoading = false;
        state.news = news;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createNews.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createNews.fulfilled, (state, action: PayloadAction<INews>) => {
        state.createLoading = false;
        state.news.push(action.payload);
      })
      .addCase(createNews.rejected, (state) => {
        state.createLoading = false;
      });

  }
});

export const newsReducer = newsSlice.reducer;
