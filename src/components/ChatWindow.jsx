/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { ChatContext } from '../context/ChatContext';
import { useFetchReciepient } from '../hooks/useFetchReciepient';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';

const ChatWindow = () => {
    const [text, setText] = useState('');

    const { user } = useContext(AuthContext);
    const {
        messages,
        isMessageLoading,
        messagesError,
        currentChat,
        createMessage,
    } = useContext(ChatContext);
    const { reciepientUser } = useFetchReciepient(currentChat, user);

    if (!reciepientUser)
        return (
            <div className="w-full mt-[500px] text-center">
                <p className="text-2xl font-semibold">
                    No conversation selected!
                </p>
            </div>
        );

    return (
        <section className="w-[900px] h-full px-4 py-[38px]">
            <article className="w-full h-full bg-white">
                {/* CHAT WINDOW */}
                <article className="w-full h-[92%] p-4">
                    <div className="mb-4">
                        <h4 className="text-2xl font-bold capitalize text-slate-700">
                            {reciepientUser?.fname}
                        </h4>
                    </div>
                    {messages &&
                        messages?.map((msg) => (
                            <div
                                key={msg._id}
                                className={`w-full flex ${
                                    msg?.senderId === user?._id
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`p-2 mb-2 min-w-[60%] max-w-[80%] lg:min-w-[40%] flex flex-col ${
                                        msg?.senderId === user?._id
                                            ? 'items-end bg-sky-100'
                                            : 'bg-slate-100'
                                    }`}
                                >
                                    <p className="text-lg font-medium">
                                        {msg.message}
                                    </p>
                                    <p>{moment(msg.createdAt).calendar()}</p>
                                </div>
                            </div>
                        ))}
                </article>
                {/* CHAT INPUT */}
                <article className="w-full h-[8%] px-8 border-t flex items-center">
                    <input
                        type="text"
                        className=" w-[90%] p-2 lg:p-4 border outline-none text-medium bg-slate-50"
                        placeholder="Type message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="p-[15px] lg:p-[21px] ml-2 hover:bg-slate-100 active:bg-sky-100"
                        onClick={() =>
                            createMessage(currentChat._id, user._id, text)
                        }
                    >
                        <IoSend />
                    </button>
                </article>
            </article>
        </section>
    );
};

export default ChatWindow;
