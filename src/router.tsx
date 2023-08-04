import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import Jobs from './routes/jobs/jobs';
import Vacancies from './routes/vacancies/vacancies';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'jobs',
        element: <Jobs />
      },
      {
        path: 'vacancies',
        element: <Vacancies />
      }
    ],
  },
]);