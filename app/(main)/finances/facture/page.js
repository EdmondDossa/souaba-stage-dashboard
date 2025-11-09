"use client";
import { useState } from "react";
import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, Filter, ChevronLeft} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Download, FileText, SlidersHorizontal, DownloadIcon } from "lucide-react";
import FactureModal from "./FactureModal";

export default function ReservationList() {
const [statusFilter, setStatusFilter] = useState("Tous les statuts");
const [showInvoice, setShowInvoice] = useState(false);

const reservations = [
    { name: "Angus Copper", id: "LG-B00108", room: "Room 101", price: "700 000F", nights: 3, total: "2 100 000F", status: "Présent" },
    { name: "Catherine Lopp", id: "LG-B00109", room: "Room 202", price: "500 000F", nights: 2, total: "1 000 000F", status: "Départ" },
    { name: "Edgar Irving", id: "LG-B00110", room: "Room 303", price: "600 000F", nights: 5, total: "3 000 000F", status: "Présent" },
    { name: "Gertrude Bale", id: "LG-B00111", room: "Room 204", price: "800 000F", nights: 1, total: "800 000F", status: "Départ" },
    { name: "Ice B. Holand", id: "LG-B00112", room: "Room 105", price: "900 000F", nights: 5, total: "4 500 000F", status: "Présent" },
    { name: "Sarah Johnson", id: "LG-B00113", room: "Room 305", price: "700 000F", nights: 2, total: "1 400 000F", status: "Présent" },
    { name: "Kevin Lee", id: "LG-B00114", room: "Room 306", price: "800 000F", nights: 3, total: "2 400 000F", status: "Départ" },
    { name: "Laura Martin", id: "LG-B00115", room: "Room 107", price: "500 000F", nights: 1, total: "500 000F", status: "Présent" },
    { name: "Robert King", id: "LG-B00116", room: "Room 208", price: "700 000F", nights: 2, total: "1 400 000F", status: "Départ" },
    { name: "Catherine Lopp", id: "LG-B00118", room: "Room 110", price: "900 000F", nights: 1, total: "900 000F", status: "Présent" },
];

const getStatusColor = (status) =>
    status === "Présent"
    ? "bg-[#D5F6E5] text-[#0D0E0D] border-[#D5F6E5]"
    : "bg-[#E7E7E7] text-[#0D0E0D] border-[#E7E7E7]";

return (
    <div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
      {/* Header Filters */}
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-[#0D0E0D] font-medium bg-[#F8AA24] border-gray-100">
            <CalendarDays size={16} color="#0D0E0D" />
            19 <span className="text-[#0D0E0D]"> - </span> 24 Juin 2028
            <ChevronDown/>
        </button>

        <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-[#0D0E0D] font-medium bg-[#F8F8F8] border-gray-100">
            <Filter color="#0D0E0D" className="h-5 w-5"/>
                <span>Tous les statuts</span>
            <ChevronDown color="#0D0E0D"/>
        </button>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#F8F8F8] border border-gray-200 rounded-md py-1.5 w-64">
                <Search size={16} className="text-[#6E6E6E] mr-2 ml-2" />
                <input
                    type="text"
                    placeholder="Search name, room etc."
                    className="w-full text-xs text-[#A3A3A3] outline-none flex justify-end"
                />
            </div>
            <div className="bg-[#F8AA24] rounded-lg p-1.5">
                <SlidersHorizontal size={22} />
            </div>
        </div>
    </div>

      {/* Table */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-none">
        <table className="w-full text-sm text-center">
        <thead className="bg-[#F5FDF9] border-b text-[#6E6E6E] text-center">
            <tr className="border-b border-gray-100">
                <th className="p-3 font-medium bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Guest Name
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Booking ID
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Room
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Prix /nuit
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Durée
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Montant payé
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Statut
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium text-center bg-[#F5FDF9]">
                    <div className={"flex justify-center"}>
                        Action
                        <ChevronUpDownIcon color="#6E6E6E" className="h-5 w-5" />
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {reservations.map((r, i) => (
            <tr key={i} className="border-b border-gray-100 bg-[#FFFFFF] py-10">
                <td className="p-3 text-[#0D0E0D] text-xs font-medium">{r.name}</td>
                <td className=" text-[#0D0E0D] text-xs font-medium">{r.id}</td>
                <td className=" text-[#0D0E0D] text-xs font-medium">{r.room}</td>
                <td className=" text-[#0D0E0D] text-xs font-medium">{r.price}</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-medium">{r.nights} nuits</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-medium">{r.total}</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-bold">
                    <span className={`px-2 py-0.5 text-xs rounded-md border flex gap-2 w-23 ${getStatusColor(r.status)}`}>
                        {r.status == "Présent" ? <span className="px-2 py-0.5 rounded-md border bg-[#CCD97E] border-[#CCD97E]"></span> : <span className="px-2 py-0.5 rounded-md border bg-[#865D5D] border-[#865D5D]"></span>}
                        {r.status}
                    </span>
                </td>
                <td className="px-4 py-3 flex justify-center">
                <button className="flex items-center font-medium gap-1 text-xs bg-[#F8AA24] text-[#0D0E0D] px-2.5 py-2 rounded-md" onClick={() => setShowInvoice(true)}>
                    <DownloadIcon size={12} color="#0D0E0D" /> Facture
                </button>
                <FactureModal  show={showInvoice} onClose={() => setShowInvoice(false)} data={r}/>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

      {/* Footer */}
        <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
            <span className="text-[#6E6E6E] text-xs">Showing 1-12 of 385</span>
            <div className="flex gap-2 text-black justify-end">
                <button className="flex items-center bg-[#F8AA24] text-[#0D0E0D] text-xs px-2.5 py-2 rounded-md" onClick={() => setShowInvoice(true)}>
                    <Download size={14} className="mr-2" /> Download
                </button>
                <FactureModal  show={showInvoice} onClose={() => setShowInvoice(false)} data={reservations[0]}/>
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
);
}
