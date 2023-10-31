/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { getRequest, BASEURL, postRequest } from '../utils/services';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatError, setUserChatError] = useState(null);

    const [globalUsers, setGlobalUsers] = useState(null);
    const [isGlobalUserLoading, setIsGlobalUserLoading] = useState(false);

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

    // fetches user chats
    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatLoading(true);
                setUserChatError(null);
                const res = await getRequest(
                    `${BASEURL}/chat/get-chats/${user._id}`
                );
                setIsUserChatLoading(false);

                if (res.error) {
                    return setUserChatError(res);
                }
                setUserChats(res.chats);
            }
        };
        getUserChats();
    }, [user]);

    // fetches global users
    useEffect(() => {
        const getGlobalUsers = async () => {
            setIsGlobalUserLoading(true);
            const res = await getRequest(`${BASEURL}/user/get-users`);
            setIsGlobalUserLoading(false);
            if (res.error) return;

            if (user) {
                const allUsersExceptClientAndNotInChat = res?.users.filter(
                    (usr) => {
                        let isChatCreated = false;

                        if (usr._id === user._id) return false;

                        if (userChats) {
                            isChatCreated = userChats.some((cht) => {
                                return (
                                    cht.members[0] === usr._id ||
                                    cht.members[1] === usr._id
                                );
                            });
                        }

                        return !isChatCreated;
                    }
                );

                setGlobalUsers(allUsersExceptClientAndNotInChat);
            }
        };
        getGlobalUsers();
    }, [userChats]);

    // get current chat messages
    useEffect(() => {
        const getMessages = async () => {
            setIsMessageLoading(true);
            setMessagesError(null);
            const res = await getRequest(
                `${BASEURL}/message/get-messages/${currentChat?._id}`
            );
            setIsMessageLoading(false);

            if (res.error) {
                return setMessagesError(res);
            }
            setMessages(res.messages);
        };
        getMessages();
    }, [currentChat]);

    // add user from global chat to my chata
    const createChat = useCallback(async (firstId, secondId) => {
        const res = await postRequest(
            `${BASEURL}/chat/create-chat`,
            JSON.stringify({ firstId, secondId })
        );

        if (res.error) return console.log(res.error);
        setUserChats((pv) => [res.chat, ...pv]);
    }, []);

    // set current chat
    const updateCurrentChat = useCallback(async (chat) => {
        setCurrentChat(chat);
    }, []);

    // create message in the chat
    const createMessage = useCallback(async (chatId, senderId, message) => {
        const res = await postRequest(
            `${BASEURL}/message/create-message`,
            JSON.stringify({
                chatId,
                senderId,
                message,
            })
        );

        if (res.error) {
            console.log(res);
            return;
        }

        setMessages((pv) => [...pv, res.message]);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatLoading,
                userChatError,
                isGlobalUserLoading,
                globalUsers,
                createChat,
                updateCurrentChat,
                currentChat,
                messages,
                isMessageLoading,
                messagesError,
                createMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
