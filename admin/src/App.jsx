import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./views/admin/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./layout/admin/AdminLayout";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Login />} />
      <Route path="/admin/*" element={<ProtectedRoute><AdminLayout />
      </ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
    </Provider >
  );
};

export default App;