'use client';
import { useState } from 'react';
import { useMutation, API_ROUTES } from '@/lib/api-routes';

export default function AddRoomModal({ onClose, onSave, category }) {
    const { mutate, loading } = useMutation();
    const [formData, setFormData] = useState({
        number: '',
        capacity: '',
        floor: '',
        status: 'AVAILABLE',
        category: category,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!category || !category.id) {
            alert('Erreur: Catégorie manquante');
            return;
        }
        
        if (!formData.number || !formData.floor) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        try {
            const apiData = {
                room_category_id: category.id,
                name: `${category.name} ${formData.number}`,
                room_number: formData.number,
                floor: parseInt(formData.floor),
                status: 'AVAILABLE',
                is_active: true,
                notes: null
            };

            await mutate(API_ROUTES.ROOMS.CREATE, {
                method: 'POST',
                data: apiData
            });

            alert('Chambre créée avec succès !');
            onSave && onSave(formData);
            onClose();
        } catch (err) {
            console.error('Erreur lors de la création de la chambre:', err);
            alert('Erreur lors de la création: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-800/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/*On empêche le clic à l’intérieur de fermer le modal */}
            <div
                className="relative bg-white rounded-lg shadow-lg w-[888px] h-[559px] p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Contenu */}
                <div className="flex justify-center mt-[20%]">
                    <div>
                        <h2 className="flex text-xl justify-center items-center font-bold mb-10">
                            Ajouter une chambre
                        </h2>

                        <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Numéro de chambre
                                </label>
                                <select
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    className="px-1 border-gray-300 rounded-lg focus:outline-none focus:bg-none"
                                >
                                    <option value="Room 101">Room 101</option>
                                    <option value="Room 102">Room 102</option>
                                    <option value="Room 103">Room 103</option>
                                </select>
                            </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Capacité d'accueil :
                            </label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                className="border-gray-300 rounded-lg focus:outline-none focus:bg-none"
                                required
                            />
                            <div className={"border-b w-32 border-gray-100"}></div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Étage :
                            </label>
                            <input
                                type="number"
                                value={formData.floor}
                                onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                                className="border-gray-300 rounded-lg focus:outline-none focus:bg-none"
                                required
                            />
                            <div className={"border-b border-gray-100 w-32"}></div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="border-gray-300 rounded-lg focus:outline-none focus:bg-none"
                            >
                                <option value="Disponible">Disponible</option>
                                <option value="Occupée">Occupée</option>
                                <option value="Hors service">Hors service</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            Enregistrer la chambre
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    );
}