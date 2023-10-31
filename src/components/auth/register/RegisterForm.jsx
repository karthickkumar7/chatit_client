import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { ImSpinner9 } from 'react-icons/im';

const RegisterForm = () => {
    const {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        setRegisterError,
        isRegisterLoading,
    } = useContext(AuthContext);

    const registerSubmitHandler = (e) => {
        e.preventDefault();
        if (registerInfo.password !== registerInfo.confirm) {
            setRegisterError({
                error: true,
                message: "Passwords didn't match!",
            });
        } else {
            registerUser();
        }
    };

    return (
        <form className="space-y-4" onSubmit={registerSubmitHandler}>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between">
                <div className="flex flex-col">
                    <label htmlFor="first" className="input_label">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first"
                        className="input"
                        value={registerInfo.fname}
                        onChange={(e) =>
                            updateRegisterInfo({
                                ...registerInfo,
                                fname: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="last" className="input_label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last"
                        className="input"
                        value={registerInfo.lname}
                        onChange={(e) =>
                            updateRegisterInfo({
                                ...registerInfo,
                                lname: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="input_label">
                    Email Address
                </label>
                <input
                    type="text"
                    id="email"
                    className="input"
                    value={registerInfo.email}
                    onChange={(e) =>
                        updateRegisterInfo({
                            ...registerInfo,
                            email: e.target.value,
                        })
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
                    value={registerInfo.password}
                    onChange={(e) =>
                        updateRegisterInfo({
                            ...registerInfo,
                            password: e.target.value,
                        })
                    }
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="confirm" className="input_label">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirm"
                    className="input"
                    value={registerInfo.confirm}
                    onChange={(e) =>
                        updateRegisterInfo({
                            ...registerInfo,
                            confirm: e.target.value,
                        })
                    }
                />
            </div>
            <br />
            <button
                type="submit"
                className={`px-4 py-3 w-full uppercase tracking-wide flex justify-center bg-indigo-500 text-white`}
                disabled={isRegisterLoading}
            >
                {isRegisterLoading ? (
                    <ImSpinner9 className="animate-spin" />
                ) : (
                    'register'
                )}
            </button>
        </form>
    );
};

export default RegisterForm;
