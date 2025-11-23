"use client";
import { Search, Filter, Calendar } from "lucide-react";
import { CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, ChevronLeft} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ModalConfirm from "./ModalConfirm";

export default function ReservationPageAnnule () {
    const [active, setActive] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); //Page actuelle
    const itemsPerPage = 10; //Nombre d'éléments par page
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState({
        start: "January 1, 2028",
        end: "December 31, 2028"
      });
    const [showDatePicker, setShowDatePicker] = useState(false);

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

    // Fonction pour convertir une date string en objet Date
const parseDate = (dateStr) => {
    return new Date(dateStr);
};

// Fonction de filtrage et recherche
  const filteredReservations = data.filter((res) => {    
    // Filtre par recherche (nom, id, type, room, statut)
    const matchesSearch = 
      searchQuery === "" ||
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.room.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre par date
    const checkInDate = parseDate(res.checkIn);
    const checkOutDate = parseDate(res.checkOut);
    const startDate = parseDate(dateRange.start);
    const endDate = parseDate(dateRange.end);
    
    // La réservation doit avoir un chevauchement avec la période sélectionnée
    const matchesDate = 
      (checkInDate >= startDate && checkInDate <= endDate) ||
      (checkOutDate >= startDate && checkOutDate <= endDate) ||
      (checkInDate <= startDate && checkOutDate >= endDate);
    
    return matchesSearch && matchesDate;
  });

  //Calcul de la pagination
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = filteredReservations.slice(startIndex, endIndex);

  //Fonctions de navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Générer les numéros de pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      // Si 5 pages ou moins, afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sinon, afficher les pages avec "..."
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  // Fonction pour formater la date d'affichage
  const formatDateDisplay = (dateStr) => {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };


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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3">
            {/* Filtre par date */}
          <div className="relative"> 
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-xs text-[#0D0E0D] font-medium bg-[#F8F8F8] border-[#F8F8F8]"
            >
              <CalendarDays size={16} />
              {formatDateDisplay(dateRange.start)} - {formatDateDisplay(dateRange.end)}
              <ChevronDown/>
            </button>
            
            {showDatePicker && (
              <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 w-80 max-h-96 overflow-y-auto">
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

            {/* Toggle activé/désactivé */}
                <div className="flex items-center gap-5">
                    <span className="text-sm text-[#000000]">Activé</span>
                    {/* Toggle Switch */}
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="mainToggle"
                            checked={active}
                            onClick={() => setActive(!active)}
                            onChange={() => {}}
                            className="sr-only peer"
                        />
                        <label
                            htmlFor="mainToggle"
                            className={`relative inline-block w-[60px] h-[10px] bg-[#ccc] rounded-full cursor-pointer transition-all duration-300 
                            peer-checked:bg-gradient-to-r peer-checked:from-[#8ea6f6] peer-checked:to-white
                            peer-focus:ring-4 peer-focus:ring-[#667eea4d]
                            after:content-[''] after:absolute after:top-[-5px] after:right-[-5px] after:w-5 after:h-5 
                            after:bg-white after:rounded-full after:transition-all after:duration-300 after:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
                            peer-checked:after:translate-x-[-50px] peer-checked:after:bg-[#8ea6f6]`}
                            onClick={() => setIsOpen(true)}
                        ></label>
                    </div>
                    <span className="text-sm text-[#000000]">Désactivé</span>
                </div>
                {/* Composant de la modale */}
                {isOpen && (
                    <ModalConfirm 
                    isOpen={isOpen} 
                        onClose={() => {
                            setIsOpen(false);
                            setActive(false); //Revient à l'état désactivé si on annule
                        }}
                        onSave={() => {
                            setActive(true); //Active le toggle si on continue
                            setIsOpen(false);
                        }}
                    />
                )}
            </div>
        </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto border-none">
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
                    Motifs
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>                
            </th>
            </tr>
            </thead>
            <tbody>
                {
                  currentReservations.length > 0 ? (
                    currentReservations.map((item, id) => (
                    <tr 
                        key={id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                        <td className="p-3 text-[#0D0E0D] text-xs font-bold">{item.name}</td>
                        <td className=" text-[#0D0E0D] text-xs font-bold">{item.id}</td>
                        <td className="p-6 text-[#0D0E0D] text-xs font-bold">{item.type}</td>
                        <td className="p-6 text-[#0D0E0D] text-xs font-bold">{item.room}</td>
                        <td className="p-6 text-[#0D0E0D] text-xs font-bold">
                            {item.checkIn} - {item.checkOut}
                        </td>
                        <td className="p-6 text-[#0D0E0D] text-xs font-bold">{item.motif}</td>
                    </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan="6" className="p-8 text-center text-sm text-gray-500">
                            Aucune réservation trouvée.
                        </td>
                    </tr>
                )
                }
            </tbody>
        </table>
    </div>
    
    {/* Footer */}
        <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
          <span className="text-[#6E6E6E] text-xs">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredReservations.length)} of {filteredReservations.length}
          </span>
          <div className="flex gap-1 text-black justify-end items-center">
            {/* Bouton précédent */}
            <button 
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              <ChevronLeft className="w-6 h-6 rounded bg-[#F8F8F8]" />
            </button>

            {/* Numéros de pages */}
            {getPageNumbers().map((num, i) => (
              <button
                key={i}
                onClick={() => typeof num === 'number' && goToPage(num)}
                disabled={num === "..."}
                className={`px-3 py-1 m-1 text-xs rounded ${
                  num === currentPage
                    ? "bg-[#F8AA24] text-[#FFFFFF]"
                    : num === "..."
                    ? "bg-transparent text-[#000000] cursor-default"
                    : "bg-[#F8F8F8] text-[#000000] hover:bg-gray-200"
                }`} 
              >
                {num}
              </button>
            ))}

            {/* Bouton suivant */}
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              <ChevronRight className="w-6 h-6 rounded bg-[#F8F8F8]" />
            </button>           
          </div>
        </div>
    </div>
    )
}