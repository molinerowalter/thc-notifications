import { Routes, Route } from 'react-router-dom';

import LoginForm from './features/login/ui/LoginForm'
import RegisterForm from './features/register/ui/RegisterForm';
import NotificationForm from './features/notifications/ui/Create';
import Header from './components/layout/Header';
import AuthProvider from './features/login/context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Header/>
      <section id="center">
        <Routes>
          <Route path="/signin" element={<div className="background-img"><LoginForm /></div>} />
          <Route path="/register" element={<div className="background-img"><RegisterForm /></div>} />
          <Route path="/profile" element={<div className="main-container"><NotificationForm /></div>} />
        </Routes>
      </section>
    </AuthProvider> 
  )
}

export default App
