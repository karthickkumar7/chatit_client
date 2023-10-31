import { Link } from 'react-router-dom';
import { SiChatbot } from 'react-icons/si';
import { PiUserFill } from 'react-icons/pi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    const NotLoggedIn = () => (
        <nav className="space-x-4 text-lg font-medium">
            <Link to={'/login'}>login</Link>
            <Link to={'/register'}>register</Link>
        </nav>
    );

    const LoggedIn = () => (
        <nav className="space-x-4 text-lg font-medium">
            <button
                className="lg:px-4 lg:py-2 px-2 py-1 uppercase bg-indigo-500 text-white"
                onClick={logoutUser}
            >
                logout
            </button>
        </nav>
    );

    return (
        <header className="w-full h-[60px] border-b">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between h-full">
                <div>
                    <Link
                        to={'/'}
                        className="flex items-center text-xl space-x-1 font-extrabold"
                    >
                        <SiChatbot /> <span>CHATit</span>
                    </Link>
                </div>
                {user && (
                    <p className="font-medium capitalize flex items-center text-emerald-500">
                        <PiUserFill />
                        Logged in as {user?.fname}
                    </p>
                )}

                {user ? <LoggedIn /> : <NotLoggedIn />}
            </div>
        </header>
    );
};

export default Navbar;
