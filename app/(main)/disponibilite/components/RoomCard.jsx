'use client';

import React from 'react';
import { SvgIcon } from "@/components/ui/common";

export const RoomCard = ({ room, index }) => {
    const getBackgroundColor = () => {
        if (room.color === 'red') return 'bg-[#C94C4C] text-white';
        if (room.color === 'green') return 'bg-[#D5F6E5]';
        return 'bg-white';
    };

    // Si la chambre est vide (pas de données)
    const isEmpty = !room.status || room.status.trim() === '' || room.status === ' ';

    const isFirstInRow = index % 7 === 0;

    if (isEmpty) {
        return (
            <div
                className={`relative w-full h-full bg-gray-50 p-3 min-h-[140px] border-r border-gray-300 overflow-hidden ${!isFirstInRow ? 'border-l-0' : ''}`}
            >
                {/* Hachures diagonales */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(130deg, #d1d5db 0, #d1d5db 2px, transparent 2px, transparent 20px)',
                    }}
                >
                    <div className="text-base font-bold p-2">{room.number}</div>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-2 cursor-pointer transition-all hover:shadow-lg border-r border-gray-300 ${!isFirstInRow ? 'border-l-0' : ''}`}>
            <div className="text-base font-bold pb-2">{room.number}</div>
            <div className={`rounded-lg pt-2 w-full h-full pb-1 ${getBackgroundColor()}`}>
                <div className={"p-1"}>
                    <div className="text-xs flex pl-1">{room.dates}</div>
                    <div className="text-sm font-bold pl-1">{room.status}</div>

                    <div className="justify-center text-center flex p-6">
                        <SvgIcon name={"Broom"} size={30} />
                    </div>

                    <div className="flex items-center justify-between pl-2 pr-2">
                        <span className="text-xs font-bold">{room.type}</span>

                        {/* Affichage conditionnel du EditCalendar */}
                        {(room.type && room.type.trim() !== '') && (
                            <SvgIcon name={"EditCalendar"} className="w-[30px] h-[50px]" size={21} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
