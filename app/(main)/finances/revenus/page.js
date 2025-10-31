"use client";
import { useState } from "react";
import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, Filter, ChevronLeft} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Download, Wallet, dollarSign } from "lucide-react";
import Card from "./Card";

export default function ReservationList() {
const [statusFilter, setStatusFilter] = useState("Tous les statuts");

const reservations = [
    { id: "LG-B00108", category: "Luxe", price: "10 000", commission: "20%", reverssement: "8 000", rembourssement: "0", status: "Succès" },
    { id: "LG-B00107", category: "Standard", price: "10 000", commission: "20%", reverssement: "0", rembourssement: "0", status: "En attente" },
    { id: "LG-B00109", category: "Suite", price: "10 000", commission: "20%", reverssement: "0", rembourssement: "0", status: "Refuser" },
    { id: "LG-B00110", category: "Supérieure", price: "10 000", commission: "20%", reverssement: "0", rembourssement: "0", status: "En attente" },
    { id: "LG-B00111", category: "Luxe", price: "50 000", commission: "20%", reverssement: "0", rembourssement: "50 000", status: "Succès" },
    { id: "LG-B00112", category: "Standard", price: "30 000", commission: "20%", reverssement: "24 000", rembourssement: "0", status: "Succès" },
    { id: "LG-B00113", category: "Supérieure", price: "20 000", commission: "20%", reverssement: "16 000", rembourssement: "0", status: "Succès" },
    { id: "LG-B00114", category: "Suite", price: "30 000", commission: "20%", reverssement: "24 000", rembourssement: "0", status: "Succès" },
    { id: "LG-B00115", category: "Luxe", price: "40 000", commission: "20%", reverssement: "32 000", rembourssement: "0", status: "Succès" },
    { id: "LG-B00116", category: "Supérieure", price: "50 000", commission: "20%", reverssement: "40 000", rembourssement: "0", status: "En attente" },
];

const getStatusColor = (status) =>
    status === "En attente"
    ? "bg-primary text-black border-primary"
    : status === "Succès"
    ? "bg-green/50 text-black border-green/50"
    : status === "Refuser"
    ? "bg-red-400 text-white border-red-400"
    : "bg-primary text-black border-primary";

return (

    <>
    
    
    

    {/*cards*/}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
                title="Revenus Total"
                value="$15,650"
                trend={3.56}
                icon={Wallet}
                bgColor="bg-white"
                bgColorTrend="bg-[#39FF14]"
                bgColorIcon="bg-green-300"
            />

            <Card
                title="Commisions"
                value="$45,650"
                trend={1.25}
                icon={dollarSign}
                bgColor="bg-white"
                bgColorTrend="bg-[#FF073A]"
                bgColorIcon="bg-green-300"
            />

            <Card
                title="Reversements"
                value="$45,650"
                trend={1.25}
                icon={dollarSign}
                bgColor="bg-white"
                bgColorTrend="bg-[#39FF14]"
                bgColorIcon="bg-green-300"
            />
    </div>


    <div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
      {/* Header Filters */}
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Transactions</h1>
        <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md py-1.5 w-64">
                <Search size={16} className="text-gray-400 mr-2 ml-2" />
                <input
                    type="text"
                    placeholder="Search expense"
                    className="w-full text-sm text-gray-600 outline-none flex justify-end"
                />
            </div>
        <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-black font-medium bg-gray-100 border-gray-100 hover:bg-gray-100">
            <Filter className="text-gray-400 h-5 w-5"/>
            <span>Toutes les catégories</span>
            <ChevronDown/>
        </button>

        <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-black font-medium bg-gray-100 border-gray-100 hover:bg-gray-100">
            <Filter className="text-gray-400 h-5 w-5"/>
                <span>Tous les statuts</span>
            <ChevronDown/>
        </button>
        </div>
    </div>

      {/* Table */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-none">
        <table className="w-full text-sm text-center">
        <thead className="bg-gray-50 border-b text-gray-400 text-center">
            <tr className="border-b border-gray-100">
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Numéro de réservation
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Catégorie
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Prix
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Commissions
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Reverssement
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Rembourssement
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
                <th className="p-3 font-medium bg-green-50">
                    <div className={"flex justify-center"}>
                        Statuts
                        <ChevronUpDownIcon className="text-gray-400 h-5 w-5" />
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {reservations.map((r, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 py-10">
                <td className="p-3 text-black font-medium">{r.id}</td>
                <td className=" text-black font-medium">{r.category}</td>
                <td className=" text-black font-medium">{r.price}</td>
                <td className=" text-black font-medium">{r.commission}</td>
                <td className="p-6 text-black font-medium">{r.reverssement}</td>
                <td className="p-6 text-black font-medium">{r.rembourssement}</td>
                <td className="p-6 text-black font-bold">
                <span className={`px-2 py-0.5 text-xs rounded-md border ${getStatusColor(r.status)}`}>{r.status}</span>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

      {/* Footer */}
    <div className="flex justify-between items-center p-4 mt-5 text-l text-gray-500">
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
        </>

);
}
