"use client";
import { Search, Filter, Calendar } from "lucide-react";
import { CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ModalConfirm from "./ModalConfirm";

export default function ReservationsPendingEnable() {
const [active, setActive] = useState(true);
const [isOpen, setIsOpen] = useState(false);

const data = [
    { name: "Angus Copper", id: "LG-800108", type: "Deluxe 101", room: "Room 101", checkIn: "June 19, 2028", checkOut: "June 22, 2028", status: "Arrivée" },
    { name: "Catherine Lopp", id: "LG-800109", type: "Standard 202", room: "Room 151", checkIn: "June 19, 2028", checkOut: "June 21, 2028", status: "Départ" },
    { name: "Edgar Irving", id: "LG-800110", type: "Suite 303", room: "Room 103", checkIn: "June 19, 2028", checkOut: "June 24, 2028", status: "Présent" },
    { name: "Gertrude Bale", id: "LG-800111", type: "Standard 204", room: "Room 254", checkIn: "June 19, 2028", checkOut: "June 20, 2028", status: "Arrivée" },
    { name: "Ice B. Holand", id: "LG-800112", type: "Deluxe 105", room: "Room 204", checkIn: "June 19, 2028", checkOut: "June 23, 2028", status: "Présent" },
    { name: "Sarah Johnson", id: "LG-800113", type: "Standard 305", room: "Room 110", checkIn: "June 20, 2028", checkOut: "June 23, 2028", status: "Présent" },
    { name: "Kevin Lee", id: "LG-800114", type: "Suite 306", room: "Room 184", checkIn: "June 20, 2028", checkOut: "June 23, 2028", status: "Départ" },
    { name: "Laura Martin", id: "LG-800115", type: "Deluxe 107", room: "Room 300", checkIn: "June 20, 2028", checkOut: "June 22, 2028", status: "Départ" },
    { name: "Robert King", id: "LG-800116", type: "Standard 208", room: "Room 356", checkIn: "June 21, 2028", checkOut: "June 23, 2028", status: "Départ" },
    { name: "Olivia White", id: "LG-800117", type: "Suite 310", room: "Room 547", checkIn: "June 21, 2028", checkOut: "June 25, 2028", status: "Présent" },
    { name: "Davis Bergson", id: "LG-800118", type: "Deluxe 110", room: "Room 654", checkIn: "June 21, 2028", checkOut: "June 24, 2028", status: "Présent" },
    { name: "Martin Curtis", id: "LG-800119", type: "Standard 209", room: "Room 109", checkIn: "June 22, 2028", checkOut: "June 27, 2028", status: "Arrivée" },
];

return (
    <div className="flex flex-col flex-1 bg-white p-8 rounded-lg shadow-sm overflow-hidden">

    <div className="flex justify-between items-center mb-6">
        <h1 className=" text-l font-semibold text-[#0D0E0D]">
            Liste des réservations en attente
        </h1>
        <div className="flex items-center gap-4">
            {/* Recherche */}
            <div className="flex items-center bg-[#F8F8F8] border-gray-100 rounded-md h-10 px-3 py-1.5 w-64">
                <Search size={16} className="text-[#6E6E6E] mr-2" />
                <input
                    type="text"
                    placeholder="Rechercher un invité, un statut, etc."
                    className="w-full text-xs text-[#A3A3A3] outline-none"
                />
            </div>

            <div className="flex items-center gap-3">
            {/* Filtre statuts */}
            <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm text-[#0D0E0D] font-medium bg-[#F8F8F8] border-[#F8F8F8]">
                <Filter className="text-[#6E6E6E] h-5 w-5"/>
                <span>Tous les statuts</span> 
                <ChevronDown/>  
            </button>

            {/* Sélecteur de date */}
            <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm text-[#0D0E0D] font-medium bg-[#F8F8F8] border-[#F8F8F8]">
                <CalendarDays size={16} className="text-[#6E6E6E]"/>
                19 <span className="text-[#0D0E0D]"> - </span> 24 Juin 2028
                <ChevronDown/>
            </button>

            {/* Toggle activé/désactivé */}
                <div className="col items-center gap-2 ml-2">
                    <span className="text-sm text-[#000000">Désactivé</span>                    
                    <span className="text-sm text-[#000000]">Activé</span>
                    <div
                    className="relative w-11 h-5 bg-[#EAEAEA] rounded-full cursor-pointer flex justify-center"
                    onClick={() => setActive(!active)}
                    >
                        <div
                            className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full transition-all ${
                            active ? "translate-x-6 bg-[#8EA6F6]" : "bg-[#EAEAEA]"
                            }`}
                            onClick={() => setIsOpen(true)}
                        ></div>
                        {/* Composant de la modale */}
                            {isOpen && (
                                <ModalConfirm isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                            )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
      {/* Tableau */}
    <div className="border border-gray-100 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-center text-gray-700">
        <thead className="bg-[#F5FDF9] text-[#6E6E6E] text-center">
            <tr className="border-b border-gray-100 text-xs">
            <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className={"flex justify-center"}>
                    Invitée
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className={"flex justify-center"}>
                    Numéro de réservation
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className={"flex justify-center"}>
                    Type de chambre
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className={"flex justify-center"}>
                    Numéro de chambre
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className={"flex justify-center"}>
                    Check-In & Check-Out
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>                
            </th>
            <th className="p-3 font-medium text-center bg-[#F5FDF9]">
                <div className={"flex justify-center"}>
                    Action
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>                
            </th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, idx) => (
            <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
                <td className="p-3 text-[#0D0E0D] text-xs font-bold">{item.name}</td>
                <td className=" text-[#0D0E0D] text-xs font-bold">{item.id}</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-bold">{item.type}</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-bold">{item.room}</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-bold">
                {item.checkIn} - {item.checkOut}
                </td>
                <td className="p-3 text-[#0D0E0D] text-xs font-bold flex justify-center gap-2">
                <button className="bg-[#29B06F] text-[#FFFFFF] text-xs px-3 py-1 rounded-md">
                    Validé
                </button>
                <button className="bg-[#C94C4C] text-[#FFFFFF] text-xs px-3 py-1 rounded-md">
                    Annuler
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

      {/* Pagination */}
        <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
            <span className="text-[#6E6E6E] text-xs">Showing 1-12 of 385</span>
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
    );
}
