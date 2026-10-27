import { Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/ui/button';

import LoginForm from './features/login/ui/LoginForm'
import RegisterForm from './features/register/ui/RegisterForm';
import NotificationForm from './features/notifications/ui/Create';

function App() {
  return (
    <>
      <header className='app-header'>
        <Button
          className="pr-4"
        >
          <Link to="/signin">Login</Link>
        </Button>
        <Button>
          <Link to="/register">Register</Link>
        </Button>
      </header>     
      <section id="center" className='main-container'>
        <Routes>
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<NotificationForm />} />
        </Routes>
      </section>
    </>
  )
}

export default App
