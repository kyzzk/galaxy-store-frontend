import { memo } from 'react';
import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import classes from './App.module.css';
import NotFound from './components/404';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PaymentRedirect from './components/PaymentRedirect';
import Logout from './components/Logout';

interface Props {
  className?: string;
}
const App: FC<Props> = memo(function App(props = {}) {
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />}/>
          <Route path="logout" element={<Logout />}/>
          <Route path="register" element={<Register />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="payments/:id" element={<PaymentRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
});
export default App;