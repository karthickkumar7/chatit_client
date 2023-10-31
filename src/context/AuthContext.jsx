/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from 'react';
import { BASEURL, postRequest } from '../utils/services';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirm: '',
    });
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    // checking localstorage for user
    useEffect(() => {
        if (!user) {
            let userexists = localStorage.getItem('User');
            if (userexists) setUser(JSON.parse(userexists));
        }
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const registerUser = useCallback(async () => {
        setIsRegisterLoading(true);
        setRegisterError(null);

        const res = await postRequest(
            `${BASEURL}/user/register`,
            JSON.stringify(registerInfo)
        );

        setIsRegisterLoading(false);

        if (res.error) {
            return setRegisterError(res);
        }

        setUser(res);
        localStorage.setItem('User', JSON.stringify(res));
    }, [registerInfo]);

    const loginUser = useCallback(async () => {
        setIsLoginLoading(true);
        setLoginError(null);

        const res = await postRequest(
            `${BASEURL}/user/login`,
            JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false);

        if (res.error) {
            return setLoginError(res);
        }

        setUser(res);
        localStorage.setItem('User', JSON.stringify(res));
    }, [loginInfo]);

    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                setRegisterError,
                isRegisterLoading,

                loginInfo,
                updateLoginInfo,
                loginUser,
                loginError,
                setLoginError,
                isLoginLoading,

                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
