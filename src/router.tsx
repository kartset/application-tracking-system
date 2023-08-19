import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import Jobs from './routes/jobs/jobs';
import Vacancies from './routes/vacancies/vacancies';
import AppWrapper from './routes/app/app';
import Candidates from './routes/candidates/candidates';

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
        path: "app",
        element: <AppWrapper />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'vacancies',
                element: <Vacancies />
            },
            {
                path:'candidates',
                element: <Candidates />
            }
        ]
      },
    ],
  },
]);