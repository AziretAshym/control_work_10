import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchNews } from '../newsThunks';
import { selectNews, selectFetchLoading } from '../newsSlice';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Typography } from '@mui/material';
import OneNews from '../Components/OneNews';

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const isFetchLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" textAlign="center" marginBottom="40px">
        News
      </Typography>

      {isFetchLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          {news.length === 0 ? (
            <Typography variant="h6">No news yet</Typography>
          ) : (
            news.map((oneNews) => (
              <Grid key={oneNews.id}>
                <OneNews
                  id={oneNews.id}
                  title={oneNews.title}
                  created_at={oneNews.create_at}
                  image={oneNews.image}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </>
  );
};

export default News;
