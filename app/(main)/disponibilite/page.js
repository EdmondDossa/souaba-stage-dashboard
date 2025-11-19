'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Settings, Bell } from 'lucide-react';
import AddDisponibiliteModal from './components/AddDisponibiliteModal';
import {RoomCard} from './components/RoomCard';
import {SvgIcon} from "@/components/ui/common";
import { useRoomAvailability, useMutation, API_ROUTES } from '@/lib/api-routes';
import getAxiosInstance from '@/lib/request';

const DisponibilitePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Tous les catégories');
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Utiliser le hook pour récupérer les données
    const { data, loading } = useRoomAvailability();
    
    // Vérifier si les données sont disponibles
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des chambres...</p>
                </div>
            </div>
        );
    }
    
    if (!data || !data.rooms || !data.floors) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-600">
                    <p>Aucune donnée de chambre disponible</p>
                </div>
            </div>
        );
    }
    
    const { rooms: allRoomsData, floors } = data;

    const getMonthName = (date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const changeMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

    const getFilteredRooms = () => {
        let filtered = allRoomsData;

        if (selectedFloor !== null) {
            filtered = filtered.filter(room => room.floor === selectedFloor);
        }

        if (selectedDay !== null) {
            filtered = filtered.filter(room => room.day === selectedDay);
        }

        if (activeFilter !== null) {
            const filterMap = {
                'Disponible': 'disponible',
                'Occupé': 'occupe',
                'Hors services': 'hors-service',
                'Propre': 'propre',
                'Sale': 'sale'
            };
            const statusType = filterMap[activeFilter];
            if (statusType) {
                filtered = filtered.filter(room => room.statusType === statusType);
            }
        }

        if (selectedCategory !== 'Tous les catégories') {
            filtered = filtered.filter(room =>
                room.type && room.type.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        return filtered;
    };

    const filteredRooms = getFilteredRooms();

    const handleFloorClick = (floorId) => {
        setSelectedFloor(selectedFloor === floorId ? null : floorId);
    };

    const handleDayClick = (day) => {
        setSelectedDay(selectedDay === day ? null : day);
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(activeFilter === filter ? null : filter);
    };

    const handleSaveDisponibilite = async (data) => {
        try {
            const axios = getAxiosInstance();
            
            // Créer une période d'indisponibilité
            await axios.post('/hotel-room-unavailabilities/unavailable', {
                hotel_room_id: data.hotel_room_id,
                start_date: data.dateDebut,
                end_date: data.dateFin,
                reason: data.motif,
                type: data.unavailabilityType || 'BLOCKED',
                notes: data.notes || ''
            });
            
            // Recharger les données
            window.location.reload();
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement:', err);
            alert('Erreur lors de l\'enregistrement de la disponibilité');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex bg-white rounded-xl">
                {/* Sidebar */}
                <div className="w-72 bg-gray-50 rounded-2xl p-6 m-6">
                    {/* Mini Calendrier */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 bg-white rounded-lg">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="font-semibold text-base">{getMonthName(currentDate)}</h2>
                            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 bg-white rounded-lg">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-gray-500 font-medium py-1">{day}</div>
                            ))}

                            {(() => {
                                const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                                const daysInPrevMonth = prevMonth.getDate();

                                return Array.from({ length: startingDayOfWeek }, (_, i) => {
                                    const day = daysInPrevMonth - startingDayOfWeek + i + 1;
                                    return (
                                        <div key={`prev-${day}`} className="text-gray-300 py-1">
                                            {day}
                                        </div>
                                    );
                                });
                            })()}

                            {Array.from({ length: daysInMonth }, (_, i) => {
                                const day = i + 1;
                                const isSelected = selectedDay === day;
                                return (
                                    <div
                                        key={day}
                                        onClick={() => handleDayClick(day)}
                                        className={`py-1 rounded cursor-pointer transition-colors text-sm ${
                                            isSelected
                                                ? 'bg-primary text-white font-bold'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Div de separation*/}
                    <div className={"bg-white text-white h-[0px] w-full border"}></div>
                    {/* Liste des étages */}
                    <div>
                        {floors.map(floor => (
                            <div
                                key={floor.id}
                                onClick={() => handleFloorClick(floor.id)}
                                className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all ${
                                    selectedFloor === floor.id
                                        ? 'bg-primary text-white shadow-md'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg"><SvgIcon className={"text-white"} name={"SquaresFour"} size={21} /></span>
                                    <span className="font-medium text-sm">{floor.name}</span>
                                </div>
                                <span className="text-xs opacity-80 text-[#606060]">{floor.rooms} chambres</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Zone principale */}
                <div className="flex-1 p-5">
                    {/* Filtres et bouton d'ajout */}
                    <div className="mb-6 flex justify-end">
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilterClick('Disponible')}
                                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                                    activeFilter === 'Disponible'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Disponible
                            </button>
                            <button
                                onClick={() => handleFilterClick('Occupé')}
                                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                                    activeFilter === 'Occupé'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Occupé
                            </button>
                            <button
                                onClick={() => handleFilterClick('Hors services')}
                                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                                    activeFilter === 'Hors services'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Hors services
                            </button>
                            <button
                                onClick={() => handleFilterClick('Propre')}
                                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                                    activeFilter === 'Propre'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Propre
                            </button>
                            <button
                                onClick={() => handleFilterClick('Sale')}
                                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                                    activeFilter === 'Sale'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Sale
                            </button>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option>Tous les catégories</option>
                                <option>Suite</option>
                                <option>Standard</option>
                                <option>Luxe</option>
                            </select>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors shadow-md font-medium"
                            >
                                Ajouter une disponibilité
                            </button>
                        </div>
                    </div>

                    {/* Indicateurs de filtres actifs */}
                    {(selectedFloor !== null || selectedDay !== null || activeFilter !== null || selectedCategory !== 'Tous les catégories') && (
                        <div className="mb-4 flex gap-2 items-center flex-wrap">
                            <span className="text-sm text-gray-600">Filtres actifs:</span>
                            {selectedFloor !== null && (
                                <span className="px-3 py-1 text-primary text-gray rounded-full text-xs flex items-center gap-2">
                                    Étage {selectedFloor}
                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFloor(null)} />
                                </span>
                            )}
                            {selectedDay !== null && (
                                <span className="px-3 py-1  text-primary rounded-full text-xs flex items-center gap-2">
                                    Jour {selectedDay}
                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDay(null)} />
                                </span>
                            )}
                            {activeFilter !== null && (
                                <span className="px-3 py-1  text-primary rounded-full text-xs flex items-center gap-2">
                                    {activeFilter}
                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveFilter(null)} />
                                </span>
                            )}
                            {selectedCategory !== 'Tous les catégories' && (
                                <span className="px-3 py-1  text-primary rounded-full text-xs flex items-center gap-2">
                                    {selectedCategory}
                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('Tous les catégories')} />
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSelectedFloor(null);
                                    setSelectedDay(null);
                                    setActiveFilter(null);
                                    setSelectedCategory('Tous les catégories');
                                }}
                                className="text-xs text-primary hover:text-primary"
                            >
                                Réinitialiser tous les filtres
                            </button>
                        </div>
                    )}

                    {/* Grille des chambres */}
                    <div className="grid grid-cols-6 border-l border-gray-300">
                        {filteredRooms.map((room, index) => (
                            <div key={index} className="border-b border-dashed border-gray-300">
                                <RoomCard 
                                    room={room} 
                                    index={index} 
                                    onEdit={(selectedRoom) => {
                                        setSelectedRoom(selectedRoom);
                                        setShowModal(true);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {filteredRooms.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-lg">Aucune chambre ne correspond aux filtres sélectionnés</p>
                            <button
                                onClick={() => {
                                    setSelectedFloor(null);
                                    setSelectedDay(null);
                                    setActiveFilter(null);
                                    setSelectedCategory('Tous les catégories');
                                }}
                                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary"
                            >
                                Afficher toutes les chambres
                            </button>
                        </div>
                    )}

                    {/* Légende */}
                    <div className="mt-8 flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#C94C4C] rounded-full"></div>
                            <span className="text-sm">Hors service</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#D5F6E5] rounded-full"></div>
                            <span className="text-sm">Occupé</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#EAEAEA] rounded-full"></div>
                            <span className="text-sm">Disponible</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AddDisponibiliteModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedRoom(null);
                }}
                onSave={handleSaveDisponibilite}
                rooms={allRoomsData}
                selectedRoom={selectedRoom}
            />
        </div>
    );
};

export default DisponibilitePage;