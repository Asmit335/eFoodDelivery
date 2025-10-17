import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import Navbar from './global/component/navbar/Navbar';
import Footer from './global/component/footer/Footer';
function App() {
  return (
    <div>
      <Navbar/>
     <RouterProvider router={router}/>
     <Footer/>
    </div>
  );
}

export default App;
