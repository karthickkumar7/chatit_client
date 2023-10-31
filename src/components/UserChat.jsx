/* eslint-disable react/prop-types */
import { FaUser } from 'react-icons/fa';
import { useFetchReciepient } from '../hooks/useFetchReciepient';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const UserChat = ({ chat, user }) => {
    const { updateCurrentChat } = useContext(ChatContext);
    const { reciepientUser } = useFetchReciepient(chat, user);

    return (
        <div
            className="w-full h-[60px] flex cursor-pointer active:bg-sky-100 hover:bg-slate-50"
            onClick={() => updateCurrentChat(chat)}
        >
            <div className="w-[20%] h-full flex items-center justify-center">
                <FaUser className="text-xl" />
            </div>
            <div className="w-[80%] h-full p-2">
                <h6 className="flex items-center justify-between">
                    <span className="capitalize font-medium">
                        {reciepientUser?.fname}
                    </span>{' '}
                    <span className="text-xs text-slate-500">12/08/2023</span>
                </h6>
                <p className="text-xs">Lorem ipsum dolor sit amet Harum...</p>
            </div>
        </div>
    );
};

export default UserChat;
