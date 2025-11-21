'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RoomList from '@/app/(main)/components/Chambres/RoomList';
import getAxiosInstance from '@/lib/request';

// Mapping des statuts API vers l'affichage
const STATUS_MAP = {
    'AVAILABLE': 'Disponible',
    'OCCUPIED': 'Occupée',
    'OUT_OF_ORDER': 'Hors service',
    'MAINTENANCE': 'En maintenance',
    'CLEANING': 'En nettoyage',
    'RESERVED': 'Réservée'
};

export default function CategoryPage() {
    const params = useParams();
    const { type } = params;
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const typeName = decodeURIComponent(type);

    useEffect(() => {
        const fetchCategoryRooms = async () => {
            try {
                setLoading(true);
                const axios = getAxiosInstance();
                
                // Mapper le nom de catégorie vers le type enum
                const typeMap = {
                    'Chambre Standard': 'STANDARD',
                    'Chambre Luxe': 'LUXE',
                    'Suite Présidentielle': 'SUITE'
                };
                
                const categoryType = typeMap[typeName];
                
                if (!categoryType) {
                    console.warn('Type de catégorie non trouvé pour:', typeName);
                    setRooms([]);
                    return;
                }
                
                // Récupérer toutes les chambres
                const roomsResponse = await axios.get('/hotel-room');
                const allRooms = roomsResponse.data?.data || roomsResponse.data || [];
                
                // console.log('Toutes les chambres:', allRooms);
                // console.log('Filtrer par type:', categoryType);
                //
                // Filtrer les chambres par type de catégorie
                const filteredRooms = allRooms.filter(room => 
                    room.category?.type === categoryType
                );
                
               // console.log('Chambres filtrées:', filteredRooms);
                
                // Mapper les chambres
                const mappedRooms = filteredRooms.map(room => ({
                    id: room.hotel_room_id,
                    number: room.name || room.room_number,
                    capacity: room.category?.capacity || 2,
                    floor: room.floor || 1,
                    status: STATUS_MAP[room.status] || room.status,
                    category: categoryName,
                    type: typeName,
                    is_active: room.is_active,
                    notes: room.notes
                }));
                
                setRooms(mappedRooms);
                
            } catch (err) {
              //  console.error('Erreur lors de la récupération des chambres:', err);
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryRooms();
    }, [type, typeName]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des chambres de {typeName}...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <RoomList initialRooms={rooms} category={typeName} />
        </main>
    );
}