"use client";
import { useState } from "react";
import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, Filter, ChevronLeft} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Download, FileText, SlidersHorizontal, DownloadIcon } from "lucide-react";
import FactureModal from "./FactureModal";

export default function ReservationList() {

    const [statusFilter, setStatusFilter] = useState("Tous les statuts");
    const [showInvoice, setShowInvoice] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState({
        start: "January 1, 2028",
        end: "December 31, 2028"
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedInvoiceData, setSelectedInvoiceData] = useState(null);

    const reservations = [
        { name: "Angus Copper", id: "LG-B00108", room: "Room 101", price: "700 000F", nights: 3, total: "2 100 000F", status: "Présent", checkIn: "June 19, 2028", checkOut: "June 22, 2028" },
        { name: "Catherine Lopp", id: "LG-B00109", room: "Room 202", price: "500 000F", nights: 2, total: "1 000 000F", status: "Départ", checkIn: "June 19, 2028", checkOut: "June 21, 2028" },
        { name: "Edgar Irving", id: "LG-B00110", room: "Room 303", price: "600 000F", nights: 5, total: "3 000 000F", status: "Présent", checkIn: "June 19, 2028", checkOut: "June 24, 2028" },
        { name: "Gertrude Bale", id: "LG-B00111", room: "Room 204", price: "800 000F", nights: 1, total: "800 000F", status: "Départ", checkIn: "June 19, 2028", checkOut: "June 20, 2028" },
        { name: "Ice B. Holand", id: "LG-B00112", room: "Room 105", price: "900 000F", nights: 5, total: "4 500 000F", status: "Présent", checkIn: "June 19, 2028", checkOut: "June 24, 2028" },
        { name: "Sarah Johnson", id: "LG-B00113", room: "Room 305", price: "700 000F", nights: 2, total: "1 400 000F", status: "Présent", checkIn: "June 20, 2028", checkOut: "June 22, 2028" },
        { name: "Kevin Lee", id: "LG-B00114", room: "Room 306", price: "800 000F", nights: 3, total: "2 400 000F", status: "Départ", checkIn: "June 20, 2028", checkOut: "June 23, 2028" },
        { name: "Laura Martin", id: "LG-B00115", room: "Room 107", price: "500 000F", nights: 1, total: "500 000F", status: "Présent", checkIn: "June 21, 2028", checkOut: "June 22, 2028" },
        { name: "Robert King", id: "LG-B00116", room: "Room 208", price: "700 000F", nights: 2, total: "1 400 000F", status: "Départ", checkIn: "June 22, 2028", checkOut: "June 24, 2028" },
        { name: "Catherine Lopp", id: "LG-B00118", room: "Room 110", price: "900 000F", nights: 1, total: "900 000F", status: "Présent", checkIn: "June 23, 2028", checkOut: "June 24, 2028" },
    ];

    // Fonction pour convertir une date string en objet Date
    const parseDate = (dateStr) => {
        return new Date(dateStr);
    };

    // Fonction de filtrage combinée
    const filteredReservations = reservations.filter((reservation) => {
    // Filtre par statut
    const matchesStatus = statusFilter === "Tous les statuts" || reservation.status === statusFilter;

    // Filtre par recherche (nom, id, room, price, total)
    const matchesSearch = 
        searchQuery === "" ||
        reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.total.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.status.toLowerCase().includes(searchQuery.toLowerCase());

        // Filtre par date
        const checkInDate = parseDate(reservation.checkIn);
        const checkOutDate = parseDate(reservation.checkOut);
        const startDate = parseDate(dateRange.start);
        const endDate = parseDate(dateRange.end);

    // La réservation doit avoir un chevauchement avec la période sélectionnée
        const matchesDate = 
            (checkInDate >= startDate && checkInDate <= endDate) ||
            (checkOutDate >= startDate && checkOutDate <= endDate) ||
            (checkInDate <= startDate && checkOutDate >= endDate);

        return matchesStatus && matchesSearch && matchesDate;
    });

    const getStatusColor = (status) =>
        status === "Présent"
            ? "bg-[#D5F6E5] text-[#0D0E0D] border-[#D5F6E5]"
            : "bg-[#E7E7E7] text-[#0D0E0D] border-[#E7E7E7]";

        // Fonction pour formater la date d'affichage
        const formatDateDisplay = (dateStr) => {
        const date = parseDate(dateStr);
        const day = date.getDate();
        const month = date.toLocaleDateString('fr-FR', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleInvoiceClick = (reservation) => {
    setSelectedInvoiceData(reservation);
    setShowInvoice(true);
    };

return (
<div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
    {/* Header Filters */}
    <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-4">
        {/* Date Range Picker */}
        <div className="relative">
        <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-[#0D0E0D] font-medium bg-[#F8AA24] border-gray-100"
        >
            <CalendarDays size={16} color="#0D0E0D" />
            {formatDateDisplay(dateRange.start)} - {formatDateDisplay(dateRange.end)}
            <ChevronDown/>
        </button>
        
        {showDatePicker && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-80">
            <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-2">Date de début</label>
                <input
                type="date"
                value={new Date(dateRange.start).toISOString().split('T')[0]}
                onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setDateRange({
                    ...dateRange,
                    start: newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-2 focus:ring-[#F8AA24]"
                />
            </div>
            <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-2">Date de fin</label>
                <input
                type="date"
                value={new Date(dateRange.end).toISOString().split('T')[0]}
                onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setDateRange({
                    ...dateRange,
                    end: newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-2 focus:ring-[#F8AA24]"
                />
            </div>
            <div className="flex gap-2">
                <button
                onClick={() => setShowDatePicker(false)}
                className="flex-1 px-3 py-2 bg-[#F8AA24] text-white rounded-md text-xs font-medium hover:bg-[#e09a1a]"
                >
                Appliquer
                </button>
                <button
                onClick={() => {
                    setDateRange({
                        start: "January 1, 2028",
                        end: "December 31, 2028"
                    });
                    setShowDatePicker(false);
                }}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300"
                >
                Réinitialiser
                </button>
            </div>
            </div>
        )}
        </div>

        {/* Status Filter */}
        <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-[#0D0E0D] font-medium bg-[#F8F8F8] border-gray-100">
        <Filter color="#0D0E0D" className="h-5 w-5"/>
        <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="outline-none bg-transparent font-medium"
        >
            <option value="Tous les statuts">Tous les statuts</option>
            <option value="Présent">Présent</option>
            <option value="Départ">Départ</option>
        </select>
        </button>
    </div>

    <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#F8F8F8] border border-gray-200 rounded-md py-1.5 w-64">
        <Search size={16} className="text-[#6E6E6E] mr-2 ml-2" />
        <input
            type="text"
            placeholder="Search name, room etc."
            className="w-full text-xs text-[#0D0E0D] outline-none bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <div className="bg-[#F8AA24] rounded-lg p-1.5 cursor-pointer hover:bg-[#e09a1a] transition">
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
            <div className={"flex justify-start px-6"}>
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
        {filteredReservations.length > 0 ? (
            filteredReservations.map((r, i) => (
            <tr key={i} className="border-b border-gray-100 bg-[#FFFFFF] py-10 hover:bg-gray-50 transition">
                <td className="p-3 text-[#0D0E0D] text-xs font-bold">{r.name}</td>
                <td className=" text-[#0D0E0D] text-xs font-bold">{r.id}</td>
                <td className=" text-[#0D0E0D] text-xs font-bold">{r.room}</td>
                <td className=" text-[#0D0E0D] text-xs font-bold">{r.price}</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-bold">{r.nights} nuits</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-bold">{r.total}</td>
                <td className="p-6 text-[#0D0E0D] text-xs font-bold">
                    <span className={`px-2 py-0.5 text-xs rounded-md border flex gap-2 w-23 ${getStatusColor(r.status)}`}>
                        {r.status === "Présent" ? <span className="px-2 py-0.5 rounded-md border bg-[#CCD97E] border-[#CCD97E]"></span> : <span className="px-2 py-0.5 rounded-md border bg-[#865D5D] border-[#865D5D]"></span>}
                        {r.status}
                    </span>
                </td>
                <td className="px-4 py-3 flex justify-center">
                    <button 
                        className="flex items-center font-medium gap-1 text-xs bg-[#F8AA24] text-[#0D0E0D] px-2.5 py-2 rounded-md hover:bg-[#e09a1a] transition" 
                        onClick={() => handleInvoiceClick(r)}
                    >
                        <DownloadIcon size={12} color="#0D0E0D" /> Facture
                    </button>
                </td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan="8" className="p-8 text-center text-gray-500 text-sm">
                Aucune réservation trouvée
            </td>
            </tr>
        )}
        </tbody>
    </table>
    </div>

    {/* Modal Facture */}
    {showInvoice && selectedInvoiceData && (
    <FactureModal 
        show={showInvoice} 
        onClose={() => {
        setShowInvoice(false);
        setSelectedInvoiceData(null);
        }} 
        data={selectedInvoiceData}
    />
    )}

    {/* Footer */}
    <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
    <span className="text-[#6E6E6E] text-xs">Showing 1-{filteredReservations.length} of {reservations.length}</span>
    <div className="flex gap-2 text-black justify-end">
        <button className="flex items-center bg-[#F8AA24] text-[#0D0E0D] text-xs px-2.5 py-2 rounded-md hover:bg-[#e09a1a] transition">
        <Download size={14} className="mr-2" /> Download
        </button>
        <button>
            <ChevronLeft className="w-6 h-6 rounded mt-1 bg-gray-100 justify-center cursor-pointer hover:bg-gray-200 transition" />
        </button>
        <div className="flex gap-1 text-black justify-end">
        {[1, 2, 3, "...", 8].map((num, i) => (
            <button
            key={i}
            className={`px-3 py-1 m-1 text-xs rounded transition ${
                num === 1
                ? "bg-[#F8AA24] text-[#FFFFFF]"
                : "bg-[#F8F8F8] text-gray-700 hover:bg-gray-200"
            }`} 
            >
            {num}
            </button>
        ))}    
        <button>
            <ChevronRight className="w-6 h-6 rounded mt-1 bg-[#F8F8F8] justify-center cursor-pointer hover:bg-gray-200 transition" />
        </button>        
        </div>
    </div>
    </div>
</div>
);
}