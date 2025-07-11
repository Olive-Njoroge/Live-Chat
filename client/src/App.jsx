import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';

export default function App() {
  const [user, setUser] = useState(null);

  // ✅ On app load, check if user exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Login setUser={(user) => {
            localStorage.setItem('user', JSON.stringify(user));  // ✅ Store user
            setUser(user);
          }} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
