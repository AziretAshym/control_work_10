import News from './features/news/Containers/News.tsx';
import Toolbar from './Components/UI/Toolbar/Toolbar.tsx';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NewsForm from './features/news/Components/NewsForm.tsx';

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
          </Routes>
          <NewsForm />
        </Container>
      </main>
    </>
  );
};

export default App;
