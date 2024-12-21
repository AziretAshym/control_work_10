import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComment } from '../../types';
import axiosApi from '../../AxiosApi.ts';

export const fetchComments = createAsyncThunk<IComment[], void>(
  'comments/fetchComments',
  async () => {
    const response = await axiosApi.get<IComment[]>('/comments');
    return response.data || [];
  }
);

