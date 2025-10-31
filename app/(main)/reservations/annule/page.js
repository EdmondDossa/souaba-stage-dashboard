"use client";
import { Search, Filter, Calendar } from "lucide-react";
import { CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ReservationPageAnnule () {
    const [active, setActive] = useState(true);

    const data = [
        { name: "Angus Copper", id: "LG-800108", type: "Deluxe 101", room: "Room 101", checkIn: "June 19, 2028", checkOut: "June 22, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Catherine Lopp", id: "LG-800109", type: "Standard 202", room: "Room 151", checkIn: "June 19, 2028", checkOut: "June 21, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Edgar Irving", id: "LG-800110", type: "Suite 303", room: "Room 103", checkIn: "June 19, 2028", checkOut: "June 24, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Gertrude Bale", id: "LG-800111", type: "Standard 204", room: "Room 254", checkIn: "June 19, 2028", checkOut: "June 20, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Ice B. Holand", id: "LG-800112", type: "Deluxe 105", room: "Room 204", checkIn: "June 19, 2028", checkOut: "June 23, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Sarah Johnson", id: "LG-800113", type: "Standard 305", room: "Room 110", checkIn: "June 20, 2028", checkOut: "June 23, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Kevin Lee", id: "LG-800114", type: "Suite 306", room: "Room 184", checkIn: "June 20, 2028", checkOut: "June 23, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Laura Martin", id: "LG-800115", type: "Deluxe 107", room: "Room 300", checkIn: "June 20, 2028", checkOut: "June 22, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Robert King", id: "LG-800116", type: "Standard 208", room: "Room 356", checkIn: "June 21, 2028", checkOut: "June 23, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Olivia White", id: "LG-800117", type: "Suite 310", room: "Room 547", checkIn: "June 21, 2028", checkOut: "June 25, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Davis Bergson", id: "LG-800118", type: "Deluxe 110", room: "Room 654", checkIn: "June 21, 2028", checkOut: "June 24, 2028", motif: "N'a pas repecter les regles de la reservations" },
        { name: "Martin Curtis", id: "LG-800119", type: "Standard 209", room: "Room 109", checkIn: "June 22, 2028", checkOut: "June 27, 2028", motif: "N'a pas repecter les regles de la reservations" },
    ]
    return (
    <div className="flex flex-col flex-1 bg-white p-8 rounded-lg shadow-sm overflow-hidden">
        <h1 className=" flex justify-between items-center text-2xl font-semibold text-gray-800">
            Liste des réservations en attente
        </h1>
    <div className="flex justify-end items-center mb-6">
        <div className="flex items-center gap-4">
            {/* Recherche */}
            <div className="flex items-center bg-gray-100 border-gray-100 rounded-md px-3 py-1.5 w-64">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Rechercher un invité, un statut, etc."
                    className="w-full text-sm outline-none"
                />
            </div>

            <div className="flex items-center gap-3">
            {/* Filtre statuts */}
            <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm text-black font-medium bg-gray-100 border-gray-100 hover:bg-gray-100">
                <Filter className="text-gray-400 h-5 w-5"/>
                <span>Tous les statuts</span> 
                <ChevronDown/>  
            </button>

            {/* Sélecteur de date */}
            <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm text-black font-medium bg-gray-100 border-gray-100 hover:bg-gray-100">
                <CalendarDays size={16} />
                19 <span className="text-gray-600"> - </span> 24 Juin 2028
                <ChevronDown/>
            </button>

            {/* Toggle activé/désactivé */}
                <div className="flex items-center gap-2 ml-2">
                    <span className="text-sm text-gray-700">Désactivé</span>
                    <div
                    className="relative w-11 h-5 bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => setActive(!active)}
                    >
                        <div
                            className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full transition-all ${
                            active ? "translate-x-6 bg-indigo-500" : "bg-gray-400"
                            }`}
                        ></div>
                    </div>
                    <span className="text-sm text-gray-700">Activé</span>
                </div>
            </div>
        </div>
    </div>
    <div className="border border-gray-100 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-center text-gray-700">
            <thead className="bg-green-50 text-gray-400 text-left">
            <tr>
            <th className="p-3 font-medium bg-green-50">
                <div className={"flex justify-center"}>
                    Invitée
                    <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-green-50">
                <div className={"flex justify-center"}>
                    Numéro de réservation
                    <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-green-50">
                <div className={"flex justify-center"}>
                    Type de chambre
                    <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-green-50">
                <div className={"flex justify-center"}>
                    Numéro de chambre
                    <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-green-50">
                <div className={"flex justify-center"}>
                    Check-In & Check-Out
                    <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium text-center bg-green-50">
                <div className={"flex justify-center"}>
                    Motifs
                    <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                </div>                
            </th>
            </tr>
            </thead>
            <tbody className={` ${active ? "" : "hidden"}`}>
                {data.map((item,id) => (
                    <tr 
                        key={id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                        <td className="p-3 text-black font-bold">{item.name}</td>
                        <td className=" text-black font-bold">{item.id}</td>
                        <td className="p-6 text-black font-bold">{item.type}</td>
                        <td className="p-6 text-black font-bold">{item.room}</td>
                        <td className="p-6 text-black font-bold">
                            {item.checkIn} - {item.checkOut}
                        </td>
                        <td className="p-6 text-black font-bold">{item.motif}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    {/* Pagination */}
    <div className={`flex justify-between items-center text-sm text-gray-500 mt-4 ${active ? "" : "hidden"}`}>
        <p>Showing 1-12 of 385</p>
            <div className="flex items-center text-black gap-2">
                <button className="px-3 py-1 bg-orange-400 text-white rounded-md text-l">1</button>
                <button className="px-3 py-1 bg-gray-100 rounded-md text-l">2</button>
                <button className="px-3 py-1 bg-gray-100 rounded-md text-l">3</button>
                <span className="text-gray-400">…</span>
                <button className="px-3 py-1 bg-gray-100 rounded-md text-l">8</button>
                <ChevronRight className="w-6 h-6 rounded mt-1 bg-gray-100 justify-center" />            
            </div>
    </div>
    </div>
    )
}