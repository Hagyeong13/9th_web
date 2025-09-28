import './App.css'
import RootLayout from './layout/root-layout';
import HomePage from './pages/homePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router=createBrowserRouter([
  {
    path:'/',
    element: <RootLayout />,
    errorElement: <h1>다시 접속</h1>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path:'popular',
        element: <MoviePage />
      },
      {
        path:'playing',
        element: <MoviePage />
      },
      {
        path:'top_rated',
        element: <MoviePage />
      },
      {
        path:'upcoming',
        element: <MoviePage />
      },
    ] 
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
