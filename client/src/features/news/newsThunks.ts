import { createAsyncThunk } from '@reduxjs/toolkit';
import { INews, INewsMutation } from '../../types';
import axiosApi from '../../AxiosApi';

export const fetchNews = createAsyncThunk<INews[], void>(
  'news/fetchNews',
  async () => {
    const response = await axiosApi.get<INews[]>('/news');
     return response.data || [];
  }
);

export const createNews = createAsyncThunk(
  'news/createNews',
  async (news: INewsMutation) => {
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('content', news.content);
    if (news.image) {
      formData.append('image', news.image);
    }

    const response = await axiosApi.post('/news', formData);

    return response.data;
  }
);

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async (id: string) => {
    try {
      const response = await axiosApi.get<INews>(`/news/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (newsId: string) => {
    await axiosApi.delete(`/news/${newsId}`);
    return newsId;
  }
);