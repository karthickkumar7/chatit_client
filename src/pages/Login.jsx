import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import LoginForm from '../components/auth/login/LoginForm';

const Login = () => {
    const { loginError } = useContext(AuthContext);

    const DefaultLoginHeader = () => (
        <div className="p-6 text-center bg-emerald-50">
            <span className="text-lg font-medium">Welcome back!</span>
        </div>
    );

    const ErrorLoginHeader = () => (
        <div className="p-6 text-center bg-red-100">
            <span className="text-lg font-medium">{loginError?.message}</span>
        </div>
    );

    return (
        <main className="w-full h-[calc(100vh-60px)] bg-slate-100">
            <div className="max-w-[1200px] mx-auto h-full flex items-center justify-center">
                <section className="w-5/6 lg:w-[550px] p-8 space-y-3 bg-white">
                    <h2 className="font-semibold text-3xl text-center">
                        CHATit
                    </h2>
                    {/* HEADER */}
                    {loginError?.error ? (
                        <ErrorLoginHeader />
                    ) : (
                        <DefaultLoginHeader />
                    )}
                    <LoginForm />
                </section>
            </div>
        </main>
    );
};

export default Login;
