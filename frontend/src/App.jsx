import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
// import Navbar from './global/component/navbar/Navbar';
import Footer from './global/component/footer/Footer';
import { Provider } from "react-redux"
import store from './store/store';
function App() {
  return (
    <div>
    <Provider store={store}>
        {/* <Navbar/> */}
     <RouterProvider router={router}/>
      <Footer/>
    </Provider>
    </div>
  );
}

export default App;
