/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { BASEURL, getRequest } from '../utils/services';

export const useFetchReciepient = (chat, user) => {
    const [reciepientUser, setReciepientUser] = useState(null);
    const [error, setError] = useState(null);

    const reciepientId = chat?.members.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if (reciepientId) {
                const res = await getRequest(
                    `${BASEURL}/user/find-user/${reciepientId}`
                );
                if (res.error) {
                    return setError(res);
                }
                setReciepientUser(res?.user);
            } else return null;
        };
        getUser();
    }, [reciepientId]);

    return { reciepientUser };
};
