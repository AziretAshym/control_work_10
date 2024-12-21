import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer position={"top-center"} />
      <App />
    </Provider>
  </BrowserRouter>,
);
