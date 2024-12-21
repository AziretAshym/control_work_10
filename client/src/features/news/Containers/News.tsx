import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchNews, deleteNews } from '../newsThunks';
import { selectFetchLoading, selectNews, selectDeleteLoading } from '../newsSlice';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Typography, Button, CardActions } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const isDeleteLoading = useAppSelector(selectDeleteLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const getImageUrl = (image: string | null) => {
    return image ? image : '/default_image.jpg';
  };

  const handleCardClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteNews(id));
  };

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
              <Card key={oneNews.id} sx={{ width: '560px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={getImageUrl(oneNews.image)}
                    alt={oneNews.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {oneNews.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {oneNews.create_at}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" onClick={() => handleCardClick(oneNews.id)}>Learn  more</Button>
                  <Button size="small"
                          onClick={() => {
                            handleDeleteClick(oneNews.id);
                          }}
                          disabled={isDeleteLoading}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </Grid>
      )}
    </>
  );
};

export default News;
