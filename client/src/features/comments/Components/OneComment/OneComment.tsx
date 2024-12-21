import React from 'react';
import { Box, Typography } from '@mui/material';
import { IComment } from '../../../../types';

interface OneCommentProps {
  comment: IComment;
}

const OneComment: React.FC<OneCommentProps> = ({ comment }) => {
  return (
    <Box marginBottom={2} padding={2} border="1px solid #ddd" borderRadius="4px">
      <Typography variant="body1">
        <strong>{comment.author || 'Anonymous'}</strong>
      </Typography>
      <Typography>{comment.text}</Typography>
    </Box>
  );
};

export default OneComment;
