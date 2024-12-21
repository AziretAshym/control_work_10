import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createNews } from '../newsThunks';
import { selectCreateLoading } from '../newsSlice';
import FileInput from '../../../Components/FileInput/FileInput.tsx';

const NewsForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectCreateLoading);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createNews({ title, content, image }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Create News</Typography>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <FileInput
        name="image"
        label="Image"
        onGetFile={(e) => setImage(e.target.files?.[0] || null)}
      />

      <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create News'}
      </Button>
    </Box>
  );
};

export default NewsForm;
