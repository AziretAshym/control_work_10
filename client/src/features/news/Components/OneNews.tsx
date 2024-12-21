import  { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { fetchNewsById } from '../newsThunks';
import { selectSelectedNews, selectFetchNewsByIdLoading } from '../newsSlice';
import { CircularProgress, Typography, Box } from '@mui/material';

const OneNews = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedNews = useAppSelector(selectSelectedNews);
  const isLoading = useAppSelector(selectFetchNewsByIdLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (!selectedNews) {
    return (
      <Typography variant="h6" textAlign="center" marginTop={2}>
        News not found.
      </Typography>
    );
  }

  return (
    <Box padding={2} width="100%">
      <Typography variant="h3" textAlign="center">
        {selectedNews.title}
      </Typography>
      {selectedNews.image && (
        <img src={selectedNews.image} alt={selectedNews.title} style={{ maxWidth: '100%', marginTop: '40px', marginBottom: '40px' }} />
      )}
      <Typography variant="body1" textAlign="center">
        {selectedNews.content}
      </Typography>
    </Box>
  );
};

export default OneNews;
