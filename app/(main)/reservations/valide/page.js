"use client";

import { useState } from "react";
import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, Filter} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import AddReservationModal from "./AddReservationModal";
import UpdateReservationModal from "./UpdateReservation";
import { useRouter } from "next/navigation";

export default function ReservationPageValide ({ }) {

  const [isOpen, setIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "June 19, 2028",
    end: "June 24, 2028"
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const reservations = [
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

  // Fonction pour convertir une date string en objet Date
  const parseDate = (dateStr) => {
    return new Date(dateStr);
  };

  const router = useRouter();

  // Fonction de filtrage et recherche
  const filteredReservations = reservations.filter((res) => {
    // Filtre par statut
    const matchesStatus = statusFilter === "Tous les statuts" || res.status === statusFilter;
    
    // Filtre par recherche (nom, id, type, room, statut)
    const matchesSearch = 
      searchQuery === "" ||
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.status.toLowerCase().includes(searchQuery.toLowerCase());
    
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
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Arrivée":
        return "bg-[#F8AA24] text-black font-medium";
      case "Présent":
        return "bg-[#29B06F] text-white";
      case "Départ":
        return "bg-[#EAEAEA] text-black font-medium";
      default:
        return "bg-gray-200 text-black font-medium";
    }
  };

  const handleReservationSave = (reservation) => {
    //console.log("Reservation saved:", reservation);
    setIsOpen(false);
  };

  // Fonction pour formater la date d'affichage
  const formatDateDisplay = (dateStr) => {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-l font-semibold text-[#0D0E0D]">Liste des réservation validées</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#F8F8F8] border-gray-100 rounded-md px-3 h-10 py-1.5 w-64">
            <Search size={16} className="text-[#6E6E6E] mr-2"/>
            <input
              type="text"
              placeholder="Rechercher un invité, un statut, etc."
              className="w-full text-xs outline-none text-[#0D0E0D] bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-xs text-[#0D0E0D] font-medium bg-[#F8F8F8] border-[#F8F8F8]">
            <Filter className="text-[#6E6E6E] h-5 w-5"/>
            <select 
              value={statusFilter} 
              onChange={handleStatusChange} 
              className="outline-none bg-transparent"
            >
              <option value="Tous les statuts">Tous les statuts</option>
              <option value="Arrivée">Arrivée</option>
              <option value="Présent">Présent</option>
              <option value="Départ">Départ</option>
            </select>
          </button>
          
          {/* Date Range Picker */}
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
              <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-80">
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
                        start: "June 19, 2028",
                        end: "June 24, 2028"
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

          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-[#F8AA24] text-[#0D0E0D] rounded-lg px-3 py-1.5 text-xs">
            Ajouter une réservation
          </button>
           {/* Composant de la modale */}
            {isOpen && (
              <AddReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border-none">
        <table className="w-full text-sm text-center">
          <thead className="bg-[#F5FDF9] border-b text-[#6E6E6E] text-center">
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
                    Type de Chambre
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                  </div>
              </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                  <div className={"flex justify-center"}>
                    Numéro de Chambre
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                  </div>
              </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                  <div className={"flex justify-center"}>
                    Check-In & Check-Out
                    <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                  </div>
                </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                  <div className={"flex justify-center"}>
                    Statut
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
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => (
                <tr key={res.id} className="border-b border-gray-100 py-10">
                  <td className="p-3 text-[#0D0E0D] text-xs font-bold">{res.name}</td>
                  <td className=" text-[#0D0E0D] text-xs font-bold">{res.id}</td>
                  <td className=" text-[#0D0E0D] text-xs font-bold">{res.type}</td>
                  <td className=" text-[#0D0E0D] text-xs font-bold">{res.room}</td>
                  <td className="p-6 text-[#0D0E0D] text-xs font-bold">
                    {res.checkIn} - {res.checkOut}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-1 py-1  text-xs rounded font-medium ${getStatusColor(
                        res.status
                      )}`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="p-3 text-right flex justify-center gap-2">   
                    <button className="p-1.5 rounded-md bg-[#F8F8F8]">
                      <Eye size={16}/>
                    </button>
                    <button className="p-1.5 rounded-md bg-[#F8F8F8]">
                      <Edit size={16} />
                    </button>

                    <button className="flex items-center gap-1 bg-[#248EF8] text-white text-xs px-1 rounded hover:bg-blue-600" onClick={() => router.push(`/reservations/profil/${res.id}`)}>
                      Payer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500 text-sm">
                  Aucune réservation trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
          <span className="text-[#6E6E6E] text-xs">Showing 1-{filteredReservations.length} of {reservations.length}</span>
          <div className="flex gap-1 text-black justify-end">
            {[1, 2, 3, "...", 8].map((num, i) => (
              <button
                key={i}
                className={`px-3 py-1 m-1 text-xs rounded ${
                  num === 1
                    ? "bg-[#F8AA24] text-[#000000]"
                    : "bg-[#F8F8F8] text-[#000000]"
                }`} 
              >
                {num}
              </button>
            ))}
            <button className="">
              <ChevronRight className="w-6 h-6 rounded mt-1 bg-[#F8F8F8] justify-center" />
            </button>            
          </div>
        </div>
      </div>
    </div>
  );
}