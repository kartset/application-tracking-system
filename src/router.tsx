import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import Contact from './routes/contact';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);