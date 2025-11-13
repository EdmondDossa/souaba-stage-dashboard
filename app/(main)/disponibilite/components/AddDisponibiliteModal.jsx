'use client';
import { useState } from 'react';

export default function AddDisponibiliteModal({ show, onClose, onSave }) {
    const [formData, setFormData] = useState({
        roomNumber: 'Room 101',
        motif: '',
        dateDebut: '',
        dateFin: '',
        roomType: 'Standard',
        status: 'Disponible',
    });

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

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
                            Ajouter une disponibilité
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-4 mb-6 ml-[10%]">
                                {/* Numéro de chambre */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Numéro de chambre
                                    </label>
                                    <select
                                        value={formData.roomNumber}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                roomNumber: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs"
                                    >
                                        <option>Room 101</option>
                                        <option>Room 102</option>
                                        <option>Room 103</option>
                                        <option>Room 104</option>
                                        <option>Room 105</option>
                                    </select>
                                    <div className="w-40 text-gray-200"></div>
                                </div>

                                {/* Motif */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Motif
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
                                        className="focus:outline-none text-xs"
                                        placeholder=" "
                                    />
                                    <div className="w-40 text-gray-200 border-b"></div>
                                </div>

                                {/* Date de début */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Date de début
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
                                        className="focus:outline-none text-xs"
                                    />
                                    <div className="w-40 text-gray-200 border-b"></div>
                                </div>

                                {/* Date de fin */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Date de fin
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
                                        className="focus:outline-none text-xs"
                                    />
                                    <div className="w-40 text-gray-200 border-b"></div>
                                </div>

                                {/* Type de chambre */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-20">
                                        Type de chambre
                                    </label>
                                    <select
                                        value={formData.roomType}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                roomType: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs"
                                    >
                                        <option>Standard</option>
                                        <option>Suite</option>
                                        <option>Luxe</option>
                                    </select>
                                    <div className="w-40 text-gray-200"></div>
                                </div>

                                {/* Statut */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-20">
                                        Statut
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value,
                                            })
                                        }
                                        className="focus:outline-none text-xs"
                                    >
                                        <option>Disponible</option>
                                        <option>Occupé</option>
                                        <option>Hors service</option>
                                    </select>
                                    <div className="w-40 text-gray-200 "></div>
                                </div>
                            </div>

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
