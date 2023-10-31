import { useContext } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { AuthContext } from '../../../context/AuthContext';

const LoginForm = () => {
    const { loginUser, isLoginLoading, loginInfo, updateLoginInfo } =
        useContext(AuthContext);

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <form className="space-y-4" onSubmit={loginSubmitHandler}>
            <div className="flex flex-col">
                <label htmlFor="email" className="input_label">
                    Email Address
                </label>
                <input
                    type="text"
                    id="email"
                    className="input"
                    value={loginInfo.email}
                    onChange={(e) =>
                        updateLoginInfo({ ...loginInfo, email: e.target.value })
                    }
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="input_label">
                    password
                </label>
                <input
                    type="password"
                    id="password"
                    className="input"
                    value={loginInfo.password}
                    onChange={(e) =>
                        updateLoginInfo({
                            ...loginInfo,
                            password: e.target.value,
                        })
                    }
                />
            </div>

            <br />
            <button
                type="submit"
                className="px-4 py-3 w-full uppercase tracking-wide bg-indigo-500 text-white"
            >
                {isLoginLoading ? (
                    <ImSpinner9 className="animate-spin" />
                ) : (
                    'login'
                )}
            </button>
        </form>
    );
};

export default LoginForm;
