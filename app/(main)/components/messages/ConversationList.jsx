'use client';
import { useState } from 'react';

export default function ConversationList({ conversations, selectedId, onSelectConversation }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-5 bg-background rounded-2xl  flex flex-col">
            {/* Header */}
            <div className="p-6">
                {/* Search bar */}
                <div className="relative rounded-2xl flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Rechercher un nom, un chat, etc."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#F8F8F8]  border-[#F8F8F8] rounded-lg focus:outline-none focus:bg-none text-sm"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button className="p-2 bg-primary hover:bg-primary text-gray-500 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Conversations list */}
            <div className="flex-1 rounded-5xl pl-5 pr-5 overflow-y-auto">
                {filteredConversations.map((conversation, index) => (
                    <div
                        key={conversation.id}
                        onClick={() => onSelectConversation(conversation)}
                        className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors  ${
                            selectedId === conversation.id ? 'bg-[#F8F8F8] rounded-2xl' : ''
                        }`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <img
                                src={conversation.avatar}
                                alt={conversation.name}
                                className={`w-12 h-12 rounded-full flex-shrink-0 object-cover object-top ${
                                    index % 2 === 0 ? 'bg-[#E7F68E]' : 'bg-[#D5F6E5]'
                                }`}
                            />
                            {conversation.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-white rounded-full"></div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>

                        {/* Unread badge */}
                        {conversation.unread > 0 && (
                            <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                  {conversation.unread}
                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}