// import { useContext } from 'react';
// import { ChatContext } from '../context/ChatContext';
import { BiWorld } from 'react-icons/bi';
import { MdSpeakerNotes } from 'react-icons/md';
import { PiSpinnerGapLight } from 'react-icons/pi';

import ChatItUser from '../components/ChatItUser';
import UserChat from '../components/UserChat';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { isUserChatLoading, userChats, globalUsers, isGlobalUserLoading } =
        useContext(ChatContext);

    return (
        <main className="w-full bg-slate-100">
            <div className="max-w-[1200px] mx-auto h-[calc(100vh-60px)] flex">
                <section className="hidden p-2 w-[300px] h-full lg:flex flex-col justify-evenly">
                    {/* GLOBAL */}
                    <article className="w-full h-[250px] p-2 bg-white">
                        <div className="p-1 mb-2 flex items-center space-x-2">
                            <BiWorld />
                            <h4 className="text-lg font-medium tracking-wider">
                                People On CHATit.
                            </h4>
                        </div>

                        <div className="w-full max-h-[200px] text-sm flex flex-wrap gap-1">
                            {isGlobalUserLoading && (
                                <p className="text-lg font-medium tracking-wider flex items-center gap-2">
                                    <PiSpinnerGapLight className="text-xl animate-spin" />{' '}
                                    <span>Loading people...</span>
                                </p>
                            )}
                            {globalUsers &&
                                globalUsers?.map((global) => (
                                    <ChatItUser
                                        key={global._id}
                                        global={global}
                                    />
                                ))}
                        </div>
                    </article>

                    {/* CHATS */}
                    <article className="w-full h-[750px] p-1 flex flex-col space-y-1 bg-white">
                        <div className="p-1 mb-2 flex items-center space-x-2">
                            <MdSpeakerNotes />
                            <h4 className="text-lg font-medium tracking-wider">
                                Your Chats.
                            </h4>
                        </div>
                        {isUserChatLoading && (
                            <p className="text-lg font-medium tracking-wider flex items-center gap-2">
                                <PiSpinnerGapLight className="text-xl animate-spin" />{' '}
                                <span>Loading chats...</span>
                            </p>
                        )}

                        {userChats?.map((userChat) => (
                            <UserChat
                                key={userChat._id}
                                chat={userChat}
                                user={user}
                            />
                        ))}
                    </article>
                </section>
                <ChatWindow />
            </div>
        </main>
    );
};

export default Chat;
