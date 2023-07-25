import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import Jobs from './routes/jobs';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'jobs',
        element: <Jobs />
      }
    ],
  },
]);