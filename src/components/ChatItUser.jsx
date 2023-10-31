/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

const ChatItUser = ({ global: { fname, _id } }) => {
    const { user } = useContext(AuthContext);
    const { createChat } = useContext(ChatContext);

    return (
        <div
            className="max-h-[35px] p-2 font-medium tracking-wide rounded-lg cursor-pointer hover:contrast-[90%] bg-emerald-100"
            onClick={() => createChat(_id, user._id)}
        >
            <span>{fname}</span>
        </div>
    );
};

export default ChatItUser;
