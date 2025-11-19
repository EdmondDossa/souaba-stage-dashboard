'use client';
import { useState, useEffect } from 'react';

// Types d'indisponibilité selon l'API
const UNAVAILABILITY_TYPES = {
    'MAINTENANCE': 'Maintenance',
    'RENOVATION': 'Rénovation',
    'BLOCKED': 'Bloquée',
    'DAMAGE': 'Dommages',
    'OTHER': 'Autre'
};

export default function AddDisponibiliteModal({ show, onClose, onSave, rooms = [], selectedRoom = null }) {
    const [formData, setFormData] = useState({
        hotel_room_id: '',
        motif: '', // reason dans l'API
        dateDebut: '', // start_date dans l'API
        dateFin: '', // end_date dans l'API
        unavailabilityType: 'BLOCKED', // type dans l'API
        notes: '' // notes dans l'API
    });

    useEffect(() => {
        if (selectedRoom) {
            setFormData({
                hotel_room_id: selectedRoom.hotel_room_id,
                motif: selectedRoom.status || '',
                dateDebut: '',
                dateFin: '',
                unavailabilityType: 'BLOCKED',
                notes: ''
            });
        } else if (rooms.length > 0) {
            setFormData({
                hotel_room_id: rooms[0].hotel_room_id,
                motif: '',
                dateDebut: '',
                dateFin: '',
                unavailabilityType: 'BLOCKED',
                notes: ''
            });
        }
    }, [selectedRoom, rooms]);

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.hotel_room_id || !formData.dateDebut || !formData.dateFin || !formData.motif) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        onSave(formData);
    };

    const selectedRoomData = rooms.find(r => r.hotel_room_id === formData.hotel_room_id) || selectedRoom;

    return (
        <div
            className="fixed inset-0 bg-gray-800/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/* Empêche la fermeture en cliquant à l’intérieur */}
            <div
                className="relative bg-white rounded-lg shadow-lg w-[70%] h-[70%] p-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Contenu principal */}
                <div className="flex justify-center mt-[8%] ">
                    <div className="w-full">
                        <h2 className="flex text-xl justify-center items-center font-bold mb-10">
                            {selectedRoom ? 'Modifier la disponibilité' : 'Ajouter une disponibilité'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-4 mb-6 ml-[10%]">
                                {/* Numéro de chambre - hotel_room_id */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Numéro de chambre *
                                    </label>
                                    <select
                                        value={formData.hotel_room_id}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                hotel_room_id: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs border-b w-40 pb-1"
                                        disabled={!!selectedRoom}
                                    >
                                        {rooms.map(room => (
                                            <option key={room.hotel_room_id} value={room.hotel_room_id}>
                                                {room.number}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Motif - reason */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Motif *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.motif}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                motif: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs border-b w-40 pb-1"
                                        placeholder="Ex: Réparation"
                                    />
                                </div>

                                {/* Date de début - start_date */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Date de début *
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.dateDebut}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                dateDebut: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs border-b w-40 pb-1"
                                    />
                                </div>

                                {/* Date de fin - end_date */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Date de fin *
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.dateFin}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                dateFin: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs border-b w-40 pb-1"
                                    />
                                </div>

                                {/* Type d'indisponibilité - type */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-20">
                                        Type d'indisponibilité
                                    </label>
                                    <select
                                        value={formData.unavailabilityType}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                unavailabilityType: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs border-b w-40 pb-1"
                                    >
                                        {Object.entries(UNAVAILABILITY_TYPES).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Notes - notes */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-20">
                                        Notes (optionnel)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                notes: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs border w-full p-2 rounded"
                                        rows="3"
                                        placeholder="Notes supplémentaires..."
                                    />
                                </div>

                                {/* COMMENTÉ: Type de chambre - n'existe pas dans hotel_room_unavailabilities */}
                                {/* Le type de chambre est dans HotelRoomCategory, pas dans les indisponibilités */}
                                {/* 
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-20">
                                        Type de chambre
                                    </label>
                                    <div className="text-xs text-gray-600">
                                        {selectedRoomData?.type || 'N/A'}
                                    </div>
                                </div>
                                */}

                                {/* COMMENTÉ: Statut - n'existe pas dans hotel_room_unavailabilities */}
                                {/* Le statut est dans HotelRoom (status), pas dans les indisponibilités */}
                                {/* 
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-20">
                                        Statut
                                    </label>
                                    <select
                                        className="focus:outline-none text-xs"
                                    >
                                        <option>Disponible</option>
                                        <option>Occupé</option>
                                        <option>Hors service</option>
                                    </select>
                                </div>
                                */}
                            </div>

                            {/* Info chambre sélectionnée */}
                            {selectedRoomData && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6 ml-[10%] mr-[10%]">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-bold">Chambre:</span> {selectedRoomData.number} - 
                                        <span className="font-bold"> Type:</span> {selectedRoomData.type || 'N/A'} - 
                                        <span className="font-bold"> Étage:</span> {selectedRoomData.floor}
                                    </p>
                                </div>
                            )}

                            {/* Bouton de validation */}
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-500 transition"
                                >
                                    Enregistrer la disponibilité
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
