import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { UserProvider } from './context/user';
import Footer from './components/Footer';
import Header from './components/Header';

const Home = React.lazy(() => import('./pages/Home'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Login = React.lazy(() => import('./pages/Login'));
const Logout = React.lazy(() => import('./pages/Logout'));
const CreateEvent = React.lazy(() => import('./pages/CreateEvent'));
const Event = React.lazy(() => import('./pages/Event'));
const UpdateEvent = React.lazy(() => import('./pages/UpdateEvent'));
const Inscription = React.lazy(() => import('./pages/Inscription'));

function App() {
  return (
    <UserProvider>
      <React.Suspense>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/updateEvent/:id" element={<UpdateEvent />} />
          <Route path="/inscription/:id" element={<Inscription />} />
        </Routes>
        <Footer />
      </React.Suspense>
    </UserProvider>
  );
}

export default App;
