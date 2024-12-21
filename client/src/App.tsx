import News from './features/news/Containers/News.tsx';
import Toolbar from './Components/UI/Toolbar/Toolbar.tsx';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NewsForm from './features/news/Components/NewsForm.tsx';
import OneNews from './features/news/Components/OneNews.tsx';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/new-news" element={<NewsForm />} />
            <Route path="/news/:id" element={<OneNews />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
