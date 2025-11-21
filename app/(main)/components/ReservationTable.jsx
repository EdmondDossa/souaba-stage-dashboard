'use client';

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/app/(main)/components/ui/badge";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import getAxiosInstance from "@/lib/request";

// Mapping des statuts API vers l'affichage
const STATUS_MAP = {
    PENDING: { label: "En attente", color: "bg-[#F8AA24] text-black rounded-[4px]" },
    CONFIRMED: { label: "Confirmée", color: "bg-blue-500 text-white rounded-[4px]" },
    CHECKED_IN: { label: "Présent", color: "bg-[#29B06F] text-white rounded-[4px]" },
    CHECKED_OUT: { label: "Départ", color: "bg-[#EAEAEA] text-gray rounded-[4px]" },
    CANCELLED: { label: "Annulée", color: "bg-red-500 text-white rounded-[4px]" },
    NO_SHOW: { label: "Absent", color: "bg-gray-400 text-white rounded-[4px]" },
};

// Mapping des types de chambres
const ROOM_TYPE_MAP = {
    STANDARD: { label: "Standard", bgColor: "bg-[#EAFBF2]", dotColor: "bg-[#BCD9CA]" },
    LUXE: { label: "Luxe", bgColor: "bg-[#F3FBC7]", dotColor: "bg-[#E7F68E]" },
    SUITE: { label: "Suite", bgColor: "bg-[#E7F68E]", dotColor: "bg-[#CCD97E]" }
};

const tableHeaders = [
    { label: "Numéro de réservation" },
    { label: "Nom de l'invité" },
    { label: "Type de chambre" },
    { label: "Numéro de chambre" },
    { label: "Durée" },
    { label: "Check-In & Check-Out" },
    { label: "Statut" },
];

// Fonction utilitaire pour calculer le nombre de nuits
const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 'N/A';
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'N/A';
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return `${nights} night${nights > 1 ? 's' : ''}`;
};

// Fonction utilitaire pour formater la date
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const ReservationTable = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous");
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 5;

    // Récupération des réservations depuis l'API
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                const axios = getAxiosInstance();
                const response = await axios.get('/reservations');
                //console.log('Réponse API:', response.data); // <- vérifie ici
                setReservations(response.data.data || []);
                setError(null);
            } catch (err) {
             //   console.error('Erreur lors de la récupération des réservations:', err);
                setError('Impossible de charger les réservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);


    // Filtrer les réservations par recherche et statut
    const filteredReservations = reservations.filter(reservation => {
        const query = searchQuery.toLowerCase();
        const guestName = `${reservation.user?.firstName || ''} ${reservation.user?.lastName || ''}`.toLowerCase();
        const matchesSearch =
            reservation.reservation_id?.toLowerCase().includes(query) ||
            guestName.includes(query) ||
            reservation.roomDetails?.some(detail => 
                detail.hotelRoomCategory?.type?.toLowerCase().includes(query)
            );

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
                        <option className={"bg-background"} value="PENDING">En attente</option>
                        <option className={"bg-background"} value="CONFIRMED">Confirmée</option>
                        <option className={"bg-background"} value="CHECKED_IN">Présent</option>
                        <option className={"bg-background"} value="CHECKED_OUT">Départ</option>
                        <option className={"bg-background"} value="CANCELLED">Annulée</option>
                        <option className={"bg-background"} value="NO_SHOW">Absent</option>
                    </select>
                </div>
            </div>

            {/* État de chargement */}
            {loading && (
                <div className="text-center py-8">
                    <p className="text-gray-500">Chargement des réservations...</p>
                </div>
            )}

            {/* État d'erreur */}
            {error && (
                <div className="text-center py-8">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Tableau */}
            {!loading && !error && (
                <>
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
                                            <ChevronUpDownIcon className="h-4 w-4" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {currentReservations.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8 text-gray-500">
                                        Aucune réservation trouvée
                                    </td>
                                </tr>
                            ) : (
                                currentReservations.map((reservation, index) => {
                                    const guestName = `${reservation.user?.firstName || ''} ${reservation.user?.lastName || ''}`.trim() || 'Invité inconnu';
                                    const roomDetail = reservation.roomDetails?.[0];
                                    const roomType = roomDetail?.hotelRoomCategory?.type || 'STANDARD';
                                    const roomTypeInfo = ROOM_TYPE_MAP[roomType] || ROOM_TYPE_MAP.STANDARD;
                                    const statusInfo = STATUS_MAP[reservation.status] || STATUS_MAP.PENDING;
                                    
                                    // Support des deux formats de date : check_in_date (API) et checkInDate (ancien)
                                    const checkInDate = reservation.check_in_date || reservation.checkInDate;
                                    const checkOutDate = reservation.check_out_date || reservation.checkOutDate;
                                    const nights = calculateNights(checkInDate, checkOutDate);
                                    
                                    // Extraire le numéro de chambre
                                    const roomNumber = roomDetail?.room_number || roomDetail?.hotelRoomCategory?.name || 'N/A';
                                    
                                    return (
                                        <tr key={reservation.reservation_id} className="border-b border-border border-gray-100 hover:bg-muted/50">
                                            <td className="py-4 px-4 text-xs">{reservation.reservation_id}</td>
                                            <td className="py-4 px-4 text-xs font-medium">{guestName}</td>
                                            <td className="py-4 px-4 text-xs">
                                                <span
                                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${roomTypeInfo.bgColor} text-black`}
                                                >
                                                    <span className={`w-2 h-2 rounded-full ${roomTypeInfo.dotColor}`}></span>
                                                    {roomTypeInfo.label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-xs">
                                                {roomNumber}
                                            </td>
                                            <td className="py-4 px-4 text-xs">{nights}</td>
                                            <td className="py-4 px-4 text-xs">
                                                {formatDate(checkInDate)} - {formatDate(checkOutDate)}
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
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
                </>
            )}
        </div>
    );
};
