"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Download, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";


export default function HotelRoomsTable() {

    const [selectedRows, setSelectedRows] = useState([2, 3]);
    const [searchQuery, setSearchQuery] = useState("");
    const [floorFilter, setFloorFilter] = useState("Toutes les Etages");
    const [statusFilter, setStatusFilter] = useState("Tous les statuts ménages");
    const [currentPage, setCurrentPage] = useState(1); //Page actuelle
    const itemsPerPage = 10; //Nombre d'éléments par page
    const [priorityFilter, setPriorityFilter] = useState("Toutes les priorités");

    const [rooms, setRooms] = useState([
    { id: 1, number: 'Room 101', type: 'Luxe', status: 'Propre', priority: 'Urgent', priorityColor: '', priorityDot: 'bg-red-500', floor: '1st', reservation: 'Présent', notes: 'Guest requested extra towels and pillows.' },
    { id: 2, number: 'Room 102', type: 'Standard', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '1st', reservation: 'Arrivée', notes: 'Ensure room is stocked with amenities.' },
    { id: 3, number: 'Room 103', type: 'Suite', status: 'Sale', priority: 'Urgent', priorityColor: '', priorityDot: 'bg-red-500', floor: '2nd', reservation: 'Départ', notes: 'Deep clean due to extended stay.' },
    { id: 4, number: 'Room 201', type: 'Standard', status: 'Propre', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '2nd', reservation: 'Présent', notes: 'Guest requested fresh linens.' },
    { id: 5, number: 'Room 202', type: 'Standard', status: 'Sale', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '2nd', reservation: 'Arrivée', notes: 'Ensure bathroom amenities are replenished.' },
    { id: 6, number: 'Room 203', type: 'Luxe', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '2nd', reservation: 'Départ', notes: 'Check minibar supplies and restock if necessary.' },
    { id: 7, number: 'Room 301', type: 'Suite', status: 'Sale',  priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '3rd', reservation: 'Présent', notes: 'Verify that all electronics are functioning properly.' },
    { id: 8, number: 'Room 302', type: 'Supérieure', status: 'Propre', priority: 'Urgent', priorityColor: '', priorityDot: 'bg-red-500', floor: '3rd', reservation: 'Départ', notes: 'Guest reported a spill on the carpet.' },
    { id: 9, number: 'Room 303', type: 'Supérieure', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '3rd', reservation: 'Reserved', notes: 'Ensure all towels are replaced.' },
    { id: 10, number: 'Room 304', type: 'Standard', status: 'Sale', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '3rd', reservation: 'Présent', notes: 'Check for any maintenance issues.' },
    { id: 11, number: 'Room 305', type: 'Suite', status: 'Propre', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '3rd', reservation: 'Arrivée', notes: 'Verify that the mini-fridge is filled with refreshments.' },
    { id: 12, number: 'Room 401', type: 'Supérieure', status: 'Vérification', priority: 'Faible', priorityColor: 'text-gray-500', priorityDot: 'bg-gray-400', floor: '4th', reservation: 'Départ', notes: 'Make sure the coffee & tea station is fully equipped.' },
    { id: 13, number: 'Room 402', type: 'Standard', status: 'Sale', priority: 'Moyen', priorityColor: '', priorityDot: 'bg-yellow-500', floor: '4th', reservation: 'Présent', notes: "Replenish the room's amenities." },
    ]);

    // Fonction pour changer le statut de ménage
    const handleStatusChange = (roomId, newStatus) => {
        setRooms(rooms.map(room => 
            room.id === roomId ? { ...room, status: newStatus } : room
        ));
    };

    // Fonction pour changer la priorité
    const handlePriorityChange = (roomId, newPriority) => {
        let newPriorityDot = '';
        let newPriorityColor = '';

        switch (newPriority) {
            case 'Urgent':
            newPriorityDot = 'bg-red-500';
            newPriorityColor = '';
            break;
            case 'Moyen':
            newPriorityDot = 'bg-yellow-500';
            newPriorityColor = '';
            break;
            case 'Faible':
            newPriorityDot = 'bg-gray-400';
            newPriorityColor = 'text-gray-500';
            break;
        }

        setRooms(rooms.map(room => 
            room.id === roomId 
            ? { ...room, priority: newPriority, priorityDot: newPriorityDot, priorityColor: newPriorityColor } 
            : room
        ));
    };

    // Fonction de filtrage combinée
    const filteredRooms = rooms.filter((room) => {
        // Filtre par recherche
        const matchesSearch = 
            searchQuery === "" ||
            room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.floor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.reservation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.notes.toLowerCase().includes(searchQuery.toLowerCase());

        // Filtre par étage
        const matchesFloor = floorFilter === "Toutes les Etages" || room.floor === floorFilter;

        // Filtre par statut de ménage
        const matchesStatus = statusFilter === "Tous les statuts ménages" || room.status === statusFilter;

        // Filtre par priorité
        const matchesPriority = priorityFilter === "Toutes les priorités" || room.priority === priorityFilter;

        return matchesSearch && matchesFloor && matchesStatus && matchesPriority;
    });

    //Calcul de la pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = filteredRooms.slice(startIndex, endIndex);

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

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Faible':
            return 'bg-[#EAFBF2] rounded-lg px-2 py-1';
            case 'Moyen':
            return 'bg-[#F3FBC7] rounded-lg px-2 py-1';
            case 'Urgent':
            return 'bg-[#FFEEEE] rounded-lg px-2 py-1';
            default:
            return 'bg-[#EAFBF2]';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Propre':
            return 'bg-[#D5F6E5] rounded-lg px-2 py-1';
            case 'Vérification':
            return 'bg-[#E7F68E] rounded-lg px-2 py-1';
            case 'Sale':
            return 'bg-[#FFC7C7] rounded-lg px-2 py-1';
            default:
            return 'bg-[#EAFBF2]';
        }
    };

    const toggleRow = (id) => {
        setSelectedRows(prev => 
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        setSelectedRows(prev => 
            prev.length === filteredRooms.length ? [] : filteredRooms.map(r => r.id)
        );
    };

return (
<div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
    {/* Header */}
    <div className="mb-6 flex items-center justify-between">
    <div className="flex items-center bg-[#F8F8F8] border-gray-100 rounded-md px-3 h-10 py-1.5 w-64">
        <Search className="mr-2" color='#6E6E6E' size={16} />
        <input
        type="text"
        placeholder="Rechercher une pièce, un étage, etc."
        className="w-full text-xs outline-none bg-transparent text-[#0D0E0D]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
    
    <div className="flex gap-3">
        {/* Filtre Étages */}
        <button className="flex items-center gap-2 bg-[#F8AA24] text-[#0D0E0D] rounded-lg px-3 py-2 text-xs">
        <Filter color='#6E6E6E' className="h-5 w-5"/>          
        <select 
            value={floorFilter} 
            onChange={(e) => setFloorFilter(e.target.value)}
            className="outline-none bg-transparent font-medium"
        >
            <option value="Toutes les Etages">Toutes les Etages</option>
            <option value="1st">1er étage</option>
            <option value="2nd">2ème étage</option>
            <option value="3rd">3ème étage</option>
            <option value="4th">4ème étage</option>
        </select>
        </button>

        {/* Filtre Statuts ménages */}
        <button className="flex items-center gap-2 bg-[#F8AA24] text-[#0D0E0D] rounded-lg px-3 py-2 text-xs">
        <Filter color='#6E6E6E' className="h-5 w-5"/>
        <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="outline-none bg-transparent font-medium"
        >
            <option value="Tous les statuts ménages">Tous les statuts ménages</option>
            <option value="Propre">Propre</option>
            <option value="Vérification">Vérification</option>
            <option value="Sale">Sale</option>
        </select>
        </button>

        {/* Filtre Priorités */}
        <button className="flex items-center gap-2 bg-[#F8AA24] text-[#0D0E0D] rounded-lg px-3 py-2 text-xs">
        <Filter color='#6E6E6E' className="h-5 w-5"/>
        <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="outline-none bg-transparent font-medium"
        >
            <option value="Toutes les priorités">Toutes les priorités</option>
            <option value="Urgent">Urgent</option>
            <option value="Moyen">Moyen</option>
            <option value="Faible">Faible</option>
        </select>
        </button>
    </div>
    </div>

    {/* Table */}
    <div className=""bg-white rounded-xl shadow-sm overflow-x-auto border-none>
    <table className="w-full text-sm text-center">
        <thead className='bg-[#F5FDF9] border-b text-[#6E6E6E] text-center'>
        <tr className="border-b border-gray-100 text-xs">
            <th className="p-3 font-medium bg-[#F5FDF9]">
            <input
                type="checkbox"
                checked={filteredRooms.length > 0 && selectedRows.length === filteredRooms.length}
                onChange={toggleAll}
                className="w-5 h-5 rounded appearance-none border-2 border-[#A3A3A3] bg-[#F8F8F8] cursor-pointer transition-all
                checked:bg-[#E7F68E] checked:border-[#E7F68E]
                checked:after:content-['✓'] checked:after:absolute checked:after:left-[2px] checked:after:top-[-2px] 
                checked:after:text-[#0D0E0D] checked:after:text-base checked:after:font-bold relative"
            />
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9] ">
            <div className={"flex justify-center"}>
                Numéro de chambre
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9] ">
            <div className={"flex justify-center"}>
                Type de chambre
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9] ">
            <div className={"flex justify-center"}>
                Statut de ménage
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9] ">
            <div className={"flex justify-center"}>
                Priorité
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9] ">
            <div className={"flex justify-center"}>
                Etage
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9] ">
            <div className={"flex justify-center"}>
                Statut de réservation
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9] ">
            <div className={"flex justify-center"}>
                Remarques
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
        </tr>
        </thead>
        <tbody>
        {
        currentReservations.length > 0 ? (
            currentReservations.map((room) => (
            <tr
                key={room.id}
                className={`border-b border-[#E7E7E7] transition ${
                selectedRows.includes(room.id) ? 'bg-[#F8F8F8]' : ''
                }`}
            >
                <td className="px-6 py-4">
                <input
                    type="checkbox"
                    checked={selectedRows.includes(room.id)}
                    onChange={() => toggleRow(room.id)}
                    className="w-5 h-5 rounded appearance-none border-2 border-[#A3A3A3] bg-[#F8F8F8] cursor-pointer transition-all
                    checked:bg-[#E7F68E] checked:border-[#E7F68E]
                    checked:after:content-['✓'] checked:after:absolute checked:after:left-[2px] checked:after:top-[-2px] 
                    checked:after:text-[#0D0E0D] checked:after:text-base checked:after:font-bold relative"
                />
                </td>
                <td className="px-6 py-4 text-xs font-bold text-[#0D0E0D]">{room.number}</td>
                <td className="px-6 py-4 text-xs font-bold text-[#0D0E0D]">{room.type}</td>
                
                {/* Statut de ménage modifiable */}
                <td className="px-6 py-4 text-start">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 text-[#0D0E0D] rounded-md text-xs font-bold ${getStatusColor(room.status)}`}>
                        <select
                        value={room.status}
                        onChange={(e) => handleStatusChange(room.id, e.target.value)}
                        className="outline-none bg-transparent font-bold cursor-pointer"
                        >
                        <option value="Propre">Propre</option>
                        <option value="Vérification">Vérification</option>
                        <option value="Sale">Sale</option>
                        </select>
                    </div>
                </td>
                
                {/* Priorité modifiable */}
                <td className={`px-6 py-4`}>
                    <div className={`inline-flex ${getPriorityColor(room.priority)} items-center gap-2 text-[#0D0E0D] text-xs font-bold`}>
                        <span className={`w-2 h-2 rounded-full ${room.priorityDot}`}></span>
                        <select
                        value={room.priority}
                        onChange={(e) => handlePriorityChange(room.id, e.target.value)}
                        className="outline-none bg-transparent font-bold cursor-pointer"
                        >
                        <option value="Urgent">Urgent</option>
                        <option value="Moyen">Moyen</option>
                        <option value="Faible">Faible</option>
                        </select>
                    </div>
                </td>
                
                <td className="px-6 py-4 text-xs font-bold text-[#0D0E0D]">{room.floor}</td>
                <td className="px-6 py-4 text-xs font-bold text-[#0D0E0D]">{room.reservation}</td>
                <td className="px-6 py-4 text-xs flex justify-center font-bold text-[#0D0E0D] text-start">{room.notes}</td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan="8" className="p-8 text-center text-gray-500 text-sm">
                Aucune chambre trouvée
            </td>
            </tr>
        )}
        </tbody>
    </table>

    {/* Footer */}
        <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
          <span className="text-[#6E6E6E] text-xs">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredRooms.length)} of {filteredRooms.length}
          </span>
          <div className="flex gap-1 text-black justify-end items-center">
            <button className="flex items-center bg-[#F8AA24] text-[#0D0E0D] text-xs px-2.5 py-2 rounded-md">
                    <Download size={14} className="mr-2" /> Download
            </button>
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
</div>  
);
}