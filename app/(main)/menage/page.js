"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Download, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";


export default function HotelRoomsTable() {
const [selectedRows, setSelectedRows] = useState([2, 3]);

const rooms = [
{ id: 1, number: 'Room 101', type: 'Luxe', status: 'Propre', priority: 'Urgent', priorityColor: '', priorityDot: 'bg-red-500', floor: '1st', reservation: 'Présent', notes: 'Guest requested extra towels and pillows.' },
{ id: 2, number: 'Room 102', type: 'Standard', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '1st', reservation: 'Arrivée', notes: 'Ensure room is stocked with amenities.' },
{ id: 3, number: 'Room 103', type: 'Suite', status: 'Sale', priority: 'Urgent', priorityColor: '', priorityDot: 'bg-red-500', floor: '2nd', reservation: 'Départ', notes: 'Deep clean due to extended stay.' },
{ id: 4, number: 'Room 201', type: 'Standard', status: 'Propre', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '2nd', reservation: 'Présent', notes: 'Guest requested fresh linens.' },
{ id: 5, number: 'Room 202', type: 'Standard', status: 'Sale', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '2nd', reservation: 'Arrivée', notes: 'Ensure bathroom amenities are replenished.' },
{ id: 6, number: 'Room 203', type: 'Luxe', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '2nd', reservation: 'Départ', notes: 'Check minibar supplies and restock if necessary.' },
{ id: 7, number: 'Room 301', type: 'Suite', status: 'Sale',  priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '3rd', reservation: 'Présent', notes: 'Verify that all electronics are functioning properly.' },
{ id: 8, number: 'Room 302', type: 'Supérieure', status: 'Propre', priority: 'Urgent', priorityColor: '', priorityDot: 'bg-red-500', floor: '3rd', reservation: 'Départ', notes: 'Guest reported a spill on the carpet.' },
{ id: 9, number: 'Room 303', type: 'Supérieure', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '3rd', reservation: 'Reserved', notes: 'Ensure all towels are replaced.' },
{ id: 10, number: 'Room 304', type: 'Standard', status: 'Sale', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '3rd', reservation: 'Présent', notes: 'Check for any maintenance issues.' },
{ id: 11, number: 'Room 305', type: 'Suite', status: 'Propre', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '3rd', reservation: 'Arrivée', notes: 'Verify that the mini-fridge is filled with refreshments.' },
{ id: 12, number: 'Room 401', type: 'Supérieure', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '4th', reservation: 'Départ', notes: 'Make sure the coffee & tea station is fully equipped.' },
{ id: 13, number: 'Room 402', type: 'Standard', status: 'Sale', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '4th', reservation: 'Présent', notes: "Replenish the room's amenities." },
];

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'Faible':
            return 'bg-[#EAFBF2] rounded-lg px-2 py-1';
        case 'Moyen':
            return 'bg-[#F3FBC7] rounded-lg px-2 py-1';
        case 'Urgent':
            return 'bg-[#FFEEEE] rounded-lg px-2 py-1';
        default:
            return 'bg-[#EAFBF2]';
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Propre':
            return 'bg-[#D5F6E5] rounded-lg px-2 py-1';
        case 'Vérification':
            return 'bg-[#E7F68E] rounded-lg px-2 py-1';
        case 'Sale':
            return 'bg-[#FFC7C7] rounded-lg px-2 py-1';
        default:
            return 'bg-[#EAFBF2]';
    }
};

const toggleRow = (id) => {
setSelectedRows(prev => 
    prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
);
};

const toggleAll = () => {
setSelectedRows(prev => 
    prev.length === rooms.length ? [] : rooms.map(r => r.id)
);
};

return (
<div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
    {/* Header */}
    <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center bg-[#F8F8F8] border-gray-100 rounded-md px-3 h-10 py-1.5 w-64">
            <Search className="mr-2" color='#6E6E6E' size={16} />
            <input
                type="text"
                placeholder="Rechercher une pièce, un étage, etc."
                className="w-full text-xs outline-none text-[#A3A3A3]"
            />
        </div>
        
        <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#F8AA24] text-[#0D0E0D] rounded-lg px-3 py-2 text-xs">
                <Filter color='#6E6E6E' className="h-5 w-5"/>          
                Toutes les Etages
                <ChevronDown size={18} />
            </button>
            <button className="flex items-center gap-2 bg-[#F8AA24] text-[#0D0E0D] rounded-lg px-3 py-2 text-xs">
                <Filter color='#6E6E6E' className="h-5 w-5"/>
                Tous les statuts ménages
                <ChevronDown size={18} />
            </button>
            <button className="flex items-center gap-2 bg-[#F8AA24] text-[#0D0E0D] rounded-lg px-3 py-2 text-xs">
                <Filter color='#6E6E6E' className="h-5 w-5"/>
                Toutes les priorités
                <ChevronDown size={18} />
            </button>
        </div>
    </div>

    {/* Table */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-none">
        <table className="w-full text-sm text-center">
            <thead className='bg-[#F5FDF9] border-b text-[#6E6E6E] text-center'>
                <tr className="border-b border-gray-100 text-xs">
                    <th className="p-3 font-medium bg-[#F5FDF9]">
                        <input
                            type="checkbox"
                            checked={selectedRows.length === rooms.length}
                            onChange={toggleAll}
                            className="w-5 h-5 rounded border-2 border-[#A3A3A3] bg-[#F8F8F8] appearance-none bg-white checked:border-[#A3A3A3] cursor-pointer"
                        />
                    </th>
                    <th className="p-3 font-medium bg-[#F5FDF9] ">
                        <div className={"flex justify-center"}>
                            Numéro de chambre
                            <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium bg-[#F5FDF9] ">
                        <div className={"flex justify-center"}>
                            Type de chambre
                            <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium bg-[#F5FDF9] ">
                        <div className={"flex justify-center"}>
                            Statut de ménage
                            <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium bg-[#F5FDF9] ">
                        <div className={"flex justify-center"}>
                            Priorité
                            <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium bg-[#F5FDF9] ">
                        <div className={"flex justify-center"}>
                            Etage
                            <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium bg-[#F5FDF9] ">
                        <div className={"flex justify-center"}>
                            Statut de réservation
                            <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium bg-[#F5FDF9] ">
                        <div className={"flex justify-start"}>
                            Remarques
                            <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
            {rooms.map((room) => (
                <tr
                key={room.id}
                className={`border-b border-[#E7E7E7] transition ${
                    selectedRows.includes(room.id) ? 'bg-[#F8F8F8]' : ''
                }`}
                >
                <td className="px-6 py-4">
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(room.id)}
                        onChange={() => toggleRow(room.id)}
                        className="w-5 h-5 rounded appearance-none border-2 border-[#A3A3A3] bg-[#F8F8F8] cursor-pointer transition-all
                        checked:bg-[#E7F68E] checked:border-[#E7F68E]
                        checked:after:content-['✓'] checked:after:absolute checked:after:left-[2px] checked:after:top-[-2px] 
                        checked:after:text-[#0D0E0D] checked:after:text-base checked:after:font-bold relative"
                    />
                </td>
                <td className="px-6 py-4 text-xs font-medium text-[#0D0E0D]">{room.number}</td>
                <td className="px-6 py-4 text-xs font-medium text-[#0D0E0D]">{room.type}</td>
                <td className="px-6 py-4  text-start  ">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 text-[#0D0E0D] rounded-md text-xs font-medium ${getStatusColor(room.status)}`}>
                    {room.status}
                    <ChevronDown size={14} />
                    </span>
                </td>
                <td className={`px-6 py-4 `}>
                    <span className={`inline-flex ${getPriorityColor(room.priority)} items-center gap-2 text-[#0D0E0D] text-xs font-medium`}>
                    <span className={`w-2 h-2 rounded-full ${room.priorityDot}`}></span>
                    {room.priority}
                    <ChevronDown size={14} />
                    </span>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-[#0D0E0D]">{room.floor}</td>
                <td className="px-6 py-4 text-xs font-medium text-[#0D0E0D]">{room.reservation}</td>
                <td className="px-6 py-4 text-xs font-medium text-[#0D0E0D] text-start">{room.notes}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
            <span className="text-[#6E6E6E] text-xs">Showing 1-12 of 385</span>
            <div className="flex gap-2 text-black justify-end">
                <button className="flex items-center bg-[#F8AA24] text-[#0D0E0D] text-xs px-2.5 py-2 rounded-md" onClick={() => setShowInvoice(true)}>
                    <Download size={14} className="mr-2" /> Download
                </button>
                    <ChevronLeft className="w-6 h-6 rounded mt-1 bg-gray-100 justify-center" />
                <div className="flex gap-1 text-black justify-end">
                    {[1, 2, 3, "...", 8].map((num, i) => (
                    <button
                    key={i}
                    className={`px-3 py-1 m-1 text-xs rounded ${
                        num === 1
                        ? "bg-[#F8AA24] text-[#FFFFFF]"
                        : "bg-[#F8F8F8] text-gray-700"
                    }`} 
                    >
                        {num}
                        </button>
                    ))}            
                    <ChevronRight className="w-6 h-6 rounded mt-1 bg-[#F8F8F8] justify-center" />
                </div>
            </div>
        </div>
    </div>
</div>  
);
}