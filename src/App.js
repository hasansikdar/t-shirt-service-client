import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <Helmet>
        <title>Home</title>
      </Helmet>
    </div>
  );
}

export default App;
