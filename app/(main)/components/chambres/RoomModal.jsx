'use client';
import { useState } from 'react';

export default function RoomModal({ room, onClose, onSave }) {
    const [formData, setFormData] = useState({
        number: room.number,
        capacity: room.capacity,
        floor: room.floor,
        status: room.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(room.id, formData);
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
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex justify-center mt-[20%]">
                    <div>
                        <h2 className="flex text-xl justify-center items-center font-bold mb-10">
                            Modifier une chambre
                        </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-4 ml-20 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Numéro de chambre
                                </label>
                                <select
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    className="focus:outline-none focus:bg-none text-xs"
                                >
                                    <option value={room.number}>{room.number}</option>
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
                                    className="focus:outline-none focus:bg-none"
                                />
                                <div className={"border-b w-32 border-gray-100"}></div>

                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Étage :
                                </label>
                                <input
                                    type="number"
                                    value={formData.floor}
                                    onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                                    className="focus:outline-none focus:bg-none"
                                />
                                <div className={"border-b w-32 border-gray-100"}></div>

                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="focus:outline-none focus:bg-none text-xs"
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
                                className="bg-primary text-white px-6 py-2 rounded-lg font-medium"
                            >
                                Modifier la chambre
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}