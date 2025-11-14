'use client';
import { useState, useRef, useEffect } from 'react';
import {SvgIcon} from "@/components/ui/common";

export default function ChatWindow({ conversation, messages, onSendMessage }) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    const groupMessagesByDateAndTime = () => {
        if (!Array.isArray(messages)) return [];

        const grouped = [];
        let currentDate = null;
        let currentTimeGroup = [];
        let lastTime = null;
        let lastSender = null;

        messages.forEach((message, index) => {
            const date = message.date || "Aujourd'hui";

            if (date !== currentDate) {
                if (currentTimeGroup.length > 0) {
                    grouped.push({ type: 'timeGroup', messages: currentTimeGroup });
                    currentTimeGroup = [];
                }
                grouped.push({ type: 'date', date });
                currentDate = date;
                lastTime = null;
                lastSender = null;
            }

            if (message.time === lastTime && message.sender === lastSender) {
                currentTimeGroup.push(message);
            } else {
                if (currentTimeGroup.length > 0) {
                    grouped.push({ type: 'timeGroup', messages: currentTimeGroup });
                }
                currentTimeGroup = [message];
                lastTime = message.time;
                lastSender = message.sender;
            }

            if (index === messages.length - 1 && currentTimeGroup.length > 0) {
                grouped.push({ type: 'timeGroup', messages: currentTimeGroup });
            }
        });

        return grouped;
    };

    const groupedMessages = groupMessagesByDateAndTime();

    return (
        <div className="flex-1 h-full rounded-2xl flex flex-col bg-[#F8F8F8] overflow-hidden">
            {/* Header - Fixe */}
            <div className="px-6 py-4 border-b border-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="rounded-full w-12 h-12 overflow-hidden bg-[#E7F68E]">
                            <img
                                src={conversation.avatar}
                                alt={conversation.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        {conversation.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">{conversation.name}</h2>
                        <p className="text-xs text-gray-500">vu pour la dernière fois récemment</p>
                    </div>
                </div>

                <button className="p-2 bg-white rounded-lg transition-colors">
                    <SvgIcon name={"DotsThree"} className={"bg-white"} size={21} />
                </button>
            </div>

            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-1" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'transparent transparent'
            }}
                 onMouseEnter={(e) => e.currentTarget.style.scrollbarColor = '#cbd5e0 transparent'}
                 onMouseLeave={(e) => e.currentTarget.style.scrollbarColor = 'transparent transparent'}>
                {groupedMessages.map((item, index) => {
                    if (item.type === 'date') {
                        return (
                            <div key={`date-${index}`} className="flex justify-center my-3">
                                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                                    {item.date}
                                </span>
                            </div>
                        );
                    }

                    if (item.type === 'timeGroup') {
                        const firstMessage = item.messages[0];
                        const isClient = firstMessage.sender === 'client';

                        return (
                            <div key={`group-${index}`} className={`flex ${isClient ? 'justify-start' : 'justify-end'} items-end gap-2 mb-4`}>
                                {isClient && (
                                    <img
                                        src={conversation.avatar}
                                        alt={conversation.name}
                                        className="w-12 h-12 bg-[#E7F68E] rounded-full flex-shrink-0 object-cover object-top"
                                    />
                                )}

                                <div className={`flex flex-col ${isClient ? 'items-start' : 'items-end'} max-w-md gap-1`}>
                                    {item.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`px-4 py-3 ${
                                                isClient
                                                    ? 'bg-[#D5F6E5] text-gray-black font-bold rounded-t-2xl rounded-r-2xl'
                                                    : 'bg-primary text-black font-bold rounded-t-2xl rounded-l-2xl'
                                            }`}
                                        >
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                        </div>
                                    ))}
                                    <span className="text-xs text-gray-900 mt-1 px-1">
                                        {firstMessage.time}
                                    </span>
                                </div>

                                {!isClient && (
                                    <div className="w-12 h-12 rounded-full bg-[#BCD9CA] flex items-center justify-center flex-shrink-0">
                                        <SvgIcon name={"Vector"} className={""} size={12} />
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return null;
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixe en bas */}
            <div className="px-6 py-4 flex-shrink-0">
                <div className="px-2 py-2 rounded-xl bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-6">
                        <div className="flex gap-2 flex-1">
                            <div className="flex bg-[#F8F8F8] rounded-lg flex-1">
                                <div className="flex rounded-tl-2xl bg-[#F8F8F8] flex-1 h-[40px] items-center px-[13px] gap-[6px]">
                                    <button
                                        type="button"
                                        className="hover:bg-gray-100 transition-colors flex-shrink-0"
                                    >
                                        <SvgIcon name={"Icon-L"} size={21} className={""} />
                                    </button>

                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 px-1 py-3 bg-transparent focus:outline-none text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="p-2 px-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                                >
                                    <SvgIcon name={"Paperclip"} className={""} size={21} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="flex p-[9px] gap-[8px] h-[40px] w-[40px] bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                >
                                    <SvgIcon name={"PaperPlaneRight"} className={""} size={21} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}