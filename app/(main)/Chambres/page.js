'use client';

import RoomsMainPage from '@/app/(main)/components/Chambres/RoomsMainPage';
import { useHotelWithCategories } from '@/lib/api-routes';

export default function ChambresPage() {
    const { data, loading } = useHotelWithCategories();

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des données de l&apos;hôtel...</p>
                </div>
            </main>
        );
    }

    if (!data || !data.hotelData) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-600">
                    <p>Aucune donnée disponible</p>
                </div>
            </main>
        );
    }

    const { hotelData, categories } = data;

    return (
        <main className="min-h-screen bg-gray-50">
            <RoomsMainPage hotelData={hotelData} categories={categories} />
        </main>
    );
}
