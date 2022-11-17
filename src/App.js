import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { UserProvider } from './context/user';
import Footer from './components/Footer';
import Header from './components/Header';

const Signup = React.lazy(() => import('./pages/Signup'));
const Login = React.lazy(() => import('./pages/Login'));
const Logout = React.lazy(() => import('./pages/Logout'));

function App() {
  return (
    <UserProvider>
      <React.Suspense>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </React.Suspense>
    </UserProvider>
  );
}

export default App;
