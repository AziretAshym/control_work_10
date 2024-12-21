import { INews } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNews, deleteNews, fetchNews, fetchNewsById } from './newsThunks';
import { RootState } from '../../app/store';

interface NewsState {
  news: INews[];
  selectedNews: INews | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchNewsByIdLoading: boolean;
  deleteLoading: boolean;  // Добавили поле для загрузки при удалении
}

const initialState: NewsState = {
  news: [],
  selectedNews: null,
  fetchLoading: false,
  createLoading: false,
  fetchNewsByIdLoading: false,
  deleteLoading: false,  // Инициализация состояния для загрузки удаления
};

export const selectNews = (state: RootState) => state.news.news;
export const selectFetchLoading = (state: RootState) => state.news.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectSelectedNews = (state: RootState) => state.news.selectedNews;
export const selectFetchNewsByIdLoading = (state: RootState) => state.news.fetchNewsByIdLoading;
export const selectDeleteLoading = (state: RootState) => state.news.deleteLoading;

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
      })

      .addCase(fetchNewsById.pending, (state) => {
        state.fetchNewsByIdLoading = true;
        state.selectedNews = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action: PayloadAction<INews | undefined>) => {
        state.fetchNewsByIdLoading = false;
        state.selectedNews = action.payload || null;
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.fetchNewsByIdLoading = false;
      })

      .addCase(deleteNews.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action: PayloadAction<string>) => {
        state.deleteLoading = false;
        state.news = state.news.filter((newsItem) => newsItem.id !== action.payload);
      })
      .addCase(deleteNews.rejected, (state) => {
        state.deleteLoading = false;
      });
  }
});

export const newsReducer = newsSlice.reducer;
