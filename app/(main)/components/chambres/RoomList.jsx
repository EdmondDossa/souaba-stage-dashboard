'use client';
import { useState } from 'react';
import RoomCard from './RoomCard';
import RoomModal from './RoomModal';
import AddRoomModal from './AddRoomModal';
import {ArrowLeft, Funnel, Search} from "lucide-react";
import {ChevronUpDownIcon} from "@heroicons/react/16/solid";
import {SvgIcon} from "@/components/ui/common";
import {FunnelIcon} from "@heroicons/react/24/solid";

export default function RoomList({ initialRooms, category }) {
    const [rooms, setRooms] = useState(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [floorFilter, setFloorFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 12;

    // Filtrer les chambres
    const filteredRooms = rooms.filter(room => {
        const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
        const matchesFloor = floorFilter === 'all' || room.floor === parseInt(floorFilter);
        const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesFloor && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
    const startIndex = (currentPage - 1) * roomsPerPage;
    const currentRooms = filteredRooms.slice(startIndex, startIndex + roomsPerPage);

    const handleEditRoom = async (roomId, updatedData) => {};

    const handleAddRoom = async (newRoomData) => {};

    const getStatusBadgeClass = (status) => {
        const classes = {
            'Disponible': 'bg-[#29B06F] text-white',
            'Occupée': 'bg-[#F8AA24]',
            'Hors service': 'bg-[#EAEAEA]',
        };
        return classes[status] || 'bg-gray-500';
    };

    return (
        <div className="p-6 font-[Lato]">
            {/* En-tête */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className={"flex"}>
                            <button
                                onClick={() => window.history.back()}
                                className="mb-4 bg-white hover:bg-gray-300 text-gray-800 px-4 py-1 mr-5 rounded-lg"
                            >
                                <ArrowLeft />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">{category}</h1>

                        </div>
                        <div className="text-sm pl-[50%] text-gray-500">
                            <div className={"flex gap-1 font-bold"}>
                                <div className={"text-primary"}>
                                    Chambres
                                </div>
                                <div>
                                    {" / "}
                                </div>
                                <div>
                                     {category}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={"bg-background rounded-2xl p-5"}>
                    <div className={"flex items-center justify-between"}>
                    {/* Titre de la liste */}
                    <h2 className="font-semibold mb-4">
                        Liste des chambres dans la catégorie {category.toLowerCase()}
                    </h2>

                    {/* Filtres */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-64 text-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Rechercher une chambre..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                                className="w-full h-2/5 pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div className={"relative w-50"}>
                            <Funnel className={"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"}/>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full h-2/5 pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="all">Tous les status</option>
                                <option value="Disponible">Disponible</option>
                                <option value="Occupée">Occupée</option>
                                <option value="Hors service">Hors service</option>
                            </select>
                        </div>
                        <div className={"relative w-31"}>
                            <Funnel className={"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"}/>
                            <select
                                value={floorFilter}
                                onChange={(e) => setFloorFilter(e.target.value)}
                                className="w-full h-2/5 pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="all">Étage</option>
                                {[...new Set(rooms.map(r => r.floor))].sort().map(floor => (
                                    <option key={floor} value={floor}>{floor}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-primary hover:bg-primary text-black px-4 py-2 rounded-lg font-medium"
                        >
                            Ajouter une chambre
                        </button>
                    </div>
                </div>

                {/* Tableau des chambres */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-green-50 h-[50px]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                <div className={"flex"}>
                                    Numéro de la chambre
                                    <ChevronUpDownIcon className={"w-4 h-4"} />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                <div className={"flex"}>
                                    Capacité d'accueil
                                    <ChevronUpDownIcon className={"w-4 h-4"} />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                <div className={"flex"}>
                                    Etage
                                    <ChevronUpDownIcon className={"w-4 h-4"} />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                <div className={"flex"}>
                                    Statut
                                    <ChevronUpDownIcon className={"w-4 h-4"} />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                <div className={"flex"}>
                                    Action
                                    <ChevronUpDownIcon className={"w-4 h-4"} />
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentRooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50">
                                <td className="px-10 py-4 whitespace-nowrap text-xs font-bold text-gray-900">
                                    {room.number}
                                </td>
                                <td className="px-15 py-4 whitespace-nowrap text-xs font-bold text-gray-900">
                                    {room.capacity}
                                </td>
                                <td className="px-10 py-4 whitespace-nowrap text-xs font-bold text-gray-900">
                                    {room.floor}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg text-black ${getStatusBadgeClass(room.status)}`}>
                        {room.status}
                      </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs">
                                    <div className="flex items-center gap-[1px]">
                                        <div className={"bg-gray-200 rounded-l-[4px] p-1 flex justify-between"}>
                                            <button
                                                onClick={() => setSelectedRoom(room)}
                                                className="text-gray-600 hover:text-gray-900"
                                                title="Voir"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className={"bg-gray-200 rounded-r-[4px] p-1 flex justify-between"}>
                                            <button
                                                onClick={() => setSelectedRoom(room)}
                                                className="text-gray-600 hover:text-gray-900"
                                                title="Modifier"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {/* Bouton précédent */}
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-primary hover:bg-gray-50 disabled:opacity-50"
                            >
                                <SvgIcon name="arrowLeft" size={21} />
                            </button>

                            {/* Bouton suivant */}
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                <SvgIcon name="arrowRight" size={21} />
                            </button>

                            {/* Bouton dernière page */}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                <SvgIcon name="arrowRight" size={21} />
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs text-gray-500">
                                    Showing {startIndex + 1}-{Math.min(startIndex + roomsPerPage, filteredRooms.length)} of {filteredRooms.length}
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                currentPage === i + 1
                                                    ? 'z-10 bg-primary border-primary text-white'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
            </div>
                </div>
        </div>

            {/* Modals */}
            {selectedRoom && (
                <RoomModal
                    room={selectedRoom}
                    onClose={() => setSelectedRoom(null)}
                    onSave={handleEditRoom}
                />
            )}

            {isAddModalOpen && (
                <AddRoomModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddRoom}
                    category={category}
                />
            )}
        </div>
    );
}