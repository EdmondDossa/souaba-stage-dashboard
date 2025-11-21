'use client';
import { useState } from 'react';
import RoomCard from './RoomCard';
import RoomModal from './RoomModal';
import AddRoomModal from './AddRoomModal';
import { useHotelWithCategories } from '@/lib/api-routes';
import {ArrowLeft, Funnel, Search} from "lucide-react";
import {ChevronUpDownIcon} from "@heroicons/react/16/solid";
import {SvgIcon} from "@/components/ui/common";

export default function RoomList({ initialRooms, category, fullCategoryName }) {
    const { refetch } = useHotelWithCategories();
    const [rooms, setRooms] = useState(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [floorFilter, setFloorFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 12;

    const handleRefresh = async () => {
        if (refetch) {
            await refetch();
        }
    };

    // Filtrer les Chambres
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
            'Disponible': 'bg-[#29B06F] text-white font-[Lato]',
            'Occupée': 'bg-[#F8AA24] text-white font-[Lato]',
            'Hors service': 'bg-[#EAEAEA] text-gray-800 font-[Lato]',
            'En maintenance': 'bg-[#FF6B6B] text-white font-[Lato]',
            'En nettoyage': 'bg-[#4ECDC4] text-white font-[Lato]',
            'Réservée': 'bg-[#FFE66D] text-gray-800 font-[Lato]'
        };
        return classes[status] || 'bg-gray-500 text-white';
    };

    return (
        <div className="p-6 font-[Lato]">
            {/* En-tête */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.history.back()}
                                className="bg-white hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">{category}</h1>
                        </div>
                        <div className="text-sm mt-2 ml-[76px] text-gray-500">
                            <div className="flex gap-1 font-bold">
                                <span className="text-primary">Chambres</span>
                                <span>/</span>
                                <span>{category}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        {/* Titre de la liste */}
                        <h2 className="mb-4 font-semibold text-gray-800">
                            Liste des chambres {category}
                        </h2>

                        {/* Filtres */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Rechercher une chambre..."
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="relative w-48">
                                <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"/>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                                >
                                    <option value="all">Tous les statuts</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="Occupée">Occupée</option>
                                    <option value="Réservée">Réservée</option>
                                    <option value="En nettoyage">En nettoyage</option>
                                    <option value="En maintenance">En maintenance</option>
                                    <option value="Hors service">Hors service</option>
                                </select>
                            </div>
                            <div className="relative w-32">
                                <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800"/>
                                <select
                                    value={floorFilter}
                                    onChange={(e) => setFloorFilter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                                >
                                    <option value="all">Étage</option>
                                    {[...new Set(rooms.map(r => r.floor))].sort().map(floor => (
                                        <option key={floor} value={floor}>Étage {floor}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-primary hover:opacity-90 text-black px-4 py-2 rounded-lg font-medium transition-opacity whitespace-nowrap"
                            >
                                + Ajouter une chambre
                            </button>
                        </div>
                    </div>

                    {/* Tableau des Chambres */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-green-50 h-[50px]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        Numéro de la chambre
                                        <ChevronUpDownIcon className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        Capacité d'accueil
                                        <ChevronUpDownIcon className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        Étage
                                        <ChevronUpDownIcon className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        Statut
                                        <ChevronUpDownIcon className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {currentRooms.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        Aucune chambre trouvée
                                    </td>
                                </tr>
                            ) : (
                                currentRooms.map((room) => (
                                    <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            {room.number}
                                        </td>
                                        <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}
                                        </td>
                                        <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-900">
                                            Étage {room.floor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs font-medium leading-5 rounded-lg ${getStatusBadgeClass(room.status)}`}>
                                                {room.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-[1px]">
                                                <button
                                                    onClick={() => setSelectedRoom(room)}
                                                    className="bg-gray-200 hover:bg-gray-300 rounded-l-[4px] p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                                    title="Voir les détails"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => setSelectedRoom(room)}
                                                    className="bg-gray-200 hover:bg-gray-300 rounded-r-[4px] p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                                    title="Modifier"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
                                            <span className="font-medium">{Math.min(startIndex + roomsPerPage, filteredRooms.length)}</span> sur{' '}
                                            <span className="font-medium">{filteredRooms.length}</span> résultats
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                                                        currentPage === i + 1
                                                            ? 'z-10 bg-primary border-primary text-white'
                                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    } ${i === 0 ? 'rounded-l-md' : ''} ${i === totalPages - 1 ? 'rounded-r-md' : ''}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
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
                    onSave={handleRefresh}
                    category={fullCategoryName || category}
                />
            )}
        </div>
    );
}