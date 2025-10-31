'use client';

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/app/(main)/components/ui/badge";
import {ChevronUpDownIcon} from "@heroicons/react/16/solid";

const reservations = [
    {
        id: "LG-B00108",
        guest: "Angus Copper",
        roomType: "Luxe",
        roomNumber: "Room 101",
        nights: "3 nights",
        checkIn: "June 19, 2028",
        checkOut: "June 22, 2028",
        status: "Présent",
        statusColor: "bg-[#29B06F] text-white rounded-[4px]",
    },
    {
        id: "LG-B00109",
        guest: "Catherine Lopp",
        roomType: "Standard",
        roomNumber: "Room 202",
        nights: "2 nights",
        checkIn: "June 19, 2028",
        checkOut: "June 21, 2028",
        status: "Arrivée",
        statusColor: "bg-[#F8AA24] text-black rounded-[4px]"
    },
    {
        id: "LG-B00110",
        guest: "Edgar Irving",
        roomType: "Suite",
        roomNumber: "Room 303",
        nights: "5 nights",
        checkIn: "June 19, 2028",
        checkOut: "June 24, 2028",
        status: "Présent",
        statusColor: "bg-[#29B06F] text-white rounded-[4px]"
    },
    {
        id: "LG-B00111",
        guest: "Ice B. Holand",
        roomType: "Standard",
        roomNumber: "Room 105",
        nights: "4 nights",
        checkIn: "June 19, 2028",
        checkOut: "June 23, 2028",
        status: "Départ",
        statusColor: "bg-[#EAEAEA] text-gray rounded-[4px]"
    },
    {
        id: "LG-B00112",
        guest: "Gertrude Bale",
        roomType: "Luxe",
        roomNumber: "Room 204",
        nights: "1 night",
        checkIn: "June 19, 2028",
        checkOut: "June 20, 2028",
        status: "Arrivée",
        statusColor: "bg-[#F8AA24] text-black rounded-[4px]"
    },
];

const tableHeaders = [
    { label: "Numéro de réservation" },
    { label: "Nom de l'invité" },
    { label: "Type de chambre" },
    { label: "Numéro de chambre" },
    { label: "Durée" },
    { label: "Check-In & Check-Out" },
    { label: "Statut" },
];

export const ReservationTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous");
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 5;

    // Filtrer les réservations par recherche et statut
    const filteredReservations = reservations.filter(reservation => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            reservation.id.toLowerCase().includes(query) ||
            reservation.guest.toLowerCase().includes(query) ||
            reservation.roomType.toLowerCase().includes(query) ||
            reservation.roomNumber.toLowerCase().includes(query);

        const matchesStatus = statusFilter === "Tous" || reservation.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);
    const startIndex = (currentPage - 1) * reservationsPerPage;
    const currentReservations = filteredReservations.slice(startIndex, startIndex + reservationsPerPage);

    return (
        <div className="bg-card rounded-xl p-6 bg-white font-[Lato]">
            {/* En-tête */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Liste de réservation</h3>
                <div className="flex items-center gap-3">
                    {/* Barre de recherche */}
                    <div className="relative">
                        <Search className="absolute text-xs left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Rechercher un invité, un statut, etc."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 pr-4 py-2 text-xs rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Filtre statut */}
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="px-4 py-2 bg-primary rounded-lg text-xs focus:bg-none"
                    >
                        <option className={"bg-background"} value="Tous">Tous les statuts</option>
                        <option className={"bg-background"} value="Présent">Présent</option>
                        <option className={"bg-background"} value="Arrivée">Arrivée</option>
                        <option className={"bg-background"} value="Départ">Départ</option>
                    </select>
                </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-green-50">
                        {tableHeaders.map((header, index) => (
                            <th
                                key={index}
                                className="text-left py-3 px-4 text-xs font-medium text-gray-500"
                            >
                                <div className="flex items-center gap-1">
                                    {header.label}
                                    {(
                                        <ChevronUpDownIcon className="h-4 w-4" />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentReservations.map((reservation, index) => (
                        <tr key={index} className="border-b border-border border-gray-100 hover:bg-muted/50">
                            <td className="py-4 px-4 text-xs">{reservation.id}</td>
                            <td className="py-4 px-4 text-xs font-medium">{reservation.guest}</td>
                            <td className="py-4 px-4 text-xs">
                                    <span
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                                            reservation.roomType === "Luxe"
                                                ? "bg-[#F3FBC7] text-black"
                                                : reservation.roomType === "Suite"
                                                    ? "bg-[#E7F68E] text-black"
                                                    : "bg-[#EAFBF2] text-black"
                                        }`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${
                                                reservation.roomType === "Luxe"
                                                    ? "bg-[#E7F68E]"
                                                    : reservation.roomType === "Suite"
                                                        ? "bg-[#CCD97E]"
                                                        : "bg-[#BCD9CA]"
                                            }`}
                                        ></span>
                                        {reservation.roomType}
                                    </span>
                            </td>
                            <td className="py-4 px-4 text-xs">{reservation.roomNumber}</td>
                            <td className="py-4 px-4 text-xs">{reservation.nights}</td>
                            <td className="py-4 px-4 text-xs">{reservation.checkIn} - {reservation.checkOut}</td>
                            <td className="py-4 px-4">
                                <Badge className={reservation.statusColor}>{reservation.status}</Badge>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-6 h-6 flex items-center justify-center rounded-4xl hover:bg-muted disabled:opacity-50"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-6 h-6 flex items-center justify-center rounded-4xl ${
                            currentPage === i + 1
                                ? "bg-primary text-white font-medium"
                                : "hover:bg-muted bg-gray-100 text-gray-700"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-6 h-6 flex items-center justify-center rounded-4xl hover:bg-muted disabled:opacity-50"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
