"use client";
import { useState } from "react";
import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, Filter, ChevronLeft} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Download, FileText, SlidersHorizontal, DownloadIcon } from "lucide-react";

export default function ReservationList() {
const [statusFilter, setStatusFilter] = useState("Tous les statuts");

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
    ? "bg-green-200 text-black border-green-200"
    : "bg-gray-100 text-black border-gray-200";

return (
    <div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
      {/* Header Filters */}
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-black font-medium bg-primary border-gray-100 hover:bg-gray-100">
            <CalendarDays size={16} />
            19 <span className="text-gray-600"> - </span> 24 Juin 2028
            <ChevronDown/>
        </button>

        <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-black font-medium bg-gray-100 border-gray-100 hover:bg-gray-100">
            <Filter className="text-gray-400 h-5 w-5"/>
                <span>Tous les statuts</span>
            <ChevronDown/>
        </button>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md py-1.5 w-64">
                <Search size={16} className="text-gray-400 mr-2 ml-2" />
                <input
                    type="text"
                    placeholder="Search name, room etc."
                    className="w-full text-sm text-gray-600 outline-none flex justify-end"
                />
            </div>
            <div className="bg-primary rounded-lg p-1.5">
                <SlidersHorizontal size={22} />
            </div>
        </div>
    </div>

      {/* Table */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-none">
        <table className="w-full text-sm text-center">
        <thead className="bg-gray-50 border-b text-gray-400 text-center">
            <tr className="border-b border-gray-100">
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Guest Name
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Booking ID
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Room
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Prix /nuit
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Durée
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Montant payé
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Statut
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium text-center bg-green-50">
                    <div className={"flex justify-center"}>
                        Action
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {reservations.map((r, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 py-10">
                <td className="p-3 text-black font-medium">{r.name}</td>
                <td className=" text-black font-medium">{r.id}</td>
                <td className=" text-black font-medium">{r.room}</td>
                <td className=" text-black font-medium">{r.price}</td>
                <td className="p-6 text-black font-medium">{r.nights} nuits</td>
                <td className="p-6 text-black font-medium">{r.total}</td>
                <td className="p-6 text-black font-bold">
                <span className={`px-2 py-0.5 text-xs rounded-md border ${getStatusColor(r.status)}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 flex justify-center">
                <button className="flex items-center gap-1 text-xs bg-primary text-black px-2.5 py-2 rounded-md hover:bg-primary/80">
                    <DownloadIcon size={12} /> Facture
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

      {/* Footer */}
    <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-gray-50">
        <p>Showing 1-12 of 535</p>

        <div className="flex gap-1 text-black justify-end">
        <button className="flex items-center bg-primary text-black text-sm px-3 py-1.5 rounded-md hover:bg-primary/80">
            <Download size={14} className="mr-2" /> Download
        </button>
                <ChevronLeft className="w-6 h-6 rounded mt-1 bg-gray-100 justify-center" />
            <div className="flex gap-1 text-black justify-end">
                {[1, 2, 3, "...", 8].map((num, i) => (
                <button
                    key={i}
                    className={`px-3  m-1 text-black text-l rounded ${
                        num === 1
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {num}
                </button>
                ))}
                <ChevronRight className="w-6 h-6 rounded mt-1 bg-gray-100 justify-center" />
            </div>
        </div>
    </div>
    </div>
);
}
