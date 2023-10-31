import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={user ? <Chat /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

export default App;
