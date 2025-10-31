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

    const groupMessagesByDate = () => {
        if (!Array.isArray(messages)) return [];

        const grouped = [];
        let currentDate = null;

        messages.forEach((message) => {
            const date = message.date || "Aujourd'hui";
            if (date !== currentDate) {
                grouped.push({ type: 'date', date });
                currentDate = date;
            }
            grouped.push({ type: 'message', ...message });
        });

        return grouped;
    };


    const groupedMessages = groupMessagesByDate();

    return (
        <div className="flex-1 rounded-4xl flex flex-col bg-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="rounded-full !w-16 !h-16 overflow-hidden bg-primary object-cover object-top">
                            <img
                                src={conversation.avatar}
                                alt={conversation.name}
                                className=""
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

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                   <SvgIcon name={"3points"} className={" "} size={10} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {groupedMessages.map((item, index) => {
                    if (item.type === 'date') {
                        return (
                            <div key={`date-${index}`} className="flex justify-center my-4">
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                  {item.date}
                </span>
                            </div>
                        );
                    }

                    const isClient = item.sender === 'client';

                    return (
                        <div key={item.id} className={`flex ${isClient ? 'justify-start' : 'justify-end'} items-end gap-2`}>
                            {/* Avatar du client à gauche */}
                            {isClient && (
                                <img
                                    src={conversation.avatar}
                                    alt={conversation.name}
                                    className="w-10 h-10 rounded-full flex-shrink-0 object-cover object-top"
                                />
                            )}


                            {/* Message bubble */}
                            <div className={`flex flex-col ${isClient ? 'items-start' : 'items-end'} max-w-md`}>
                                <div
                                    className={`px-4 py-3  ${
                                        isClient
                                            ? 'bg-green-300 text-gray-black font-bold rounded-t-2xl rounded-r-2xl'
                                            : 'bg-primary text-black font-bold rounded-t-2xl rounded-l-2xl'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed">{item.text}</p>
                                </div>
                                <span className="text-xs text-gray-900 mt-1 px-1">
                  {item.time}
                </span>
                            </div>

                            {/* Checkmark pour les messages admin */}
                            {!isClient && (
                                <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                                   <SvgIcon name={"safeRoom"} className={""} size={21} />
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    {/* Emoji button */}
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    {/* Input field */}
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />

                    {/* Attachment button */}
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    {/* Send button */}
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3 bg-primary hover:bg-primary disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex-shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}