'use client';

import React from 'react';
import {SvgIcon} from "@/components/ui/common";

export const RoomCard = ({ room, index }) => {
    const getBackgroundColor = () => {
        if (room.color === 'red') return 'bg-[#C94C4C] text-white';
        if (room.color === 'green') return 'bg-[#D5F6E5]';
        return 'bg-white';
    };

    // Si la chambre est vide (pas de données) - carte vide complète
    const isEmpty = !room.status || room.status === '';

    const isFirstInRow = index % 7 === 0;

    if (isEmpty) {
        return (
            <div className={`bg-gray-50 p-3 min-h-[140px] border-r border-dashed border-gray-300 ${!isFirstInRow ? 'border-l-0' : ''}`}>
                {/* Complètement vide - pas de contenu */}
            </div>
        );
    }

    return (
        <div className={`p-1 cursor-pointer transition-all hover:shadow-lg border-r border-dashed border-gray-300 ${!isFirstInRow ? 'border-l-0' : ''}`}>
            <div className="text-base font-bold pb-2">{room.number}</div>
            <div className={`rounded-lg pt-2  w-[100%] h-[100%] pb-1 ${getBackgroundColor()}`}>
                <div className={""}>
                    <div className="text-xs flex pl-1">{room.dates}</div>
                    <div className="text-sm font-bold pl-1">{room.status}</div>
                    <div className={"justify-center text-center flex p-5"}>
                        <SvgIcon name={"Broom"} className={""} size={30} />
                    </div>
                    <div className="flex items-center pl-2 justify-between pr-2">
                        <span className="text-xs font-bold">{room.type}</span>
                        <SvgIcon name={"EditCalendar"} className={"w-[30px] h-[50px]"} size={21} />
                    </div>
                </div>
            </div>
        </div>
    );
};