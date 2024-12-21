import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { baseUrl } from '../../../GeneralConstants';

interface Props {
  id: string;
  title: string;
  created_at: string;
  image?: string | null;
}

const OneNews: React.FC<Props> = ({ title, image, created_at }) => {
  const messageImage = image ? `${baseUrl}/${image}` : '/assets/default_img.jpg';
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={messageImage}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {created_at}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OneNews;
