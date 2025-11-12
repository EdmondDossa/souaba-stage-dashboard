'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AddDisponibiliteModal = ({ show, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        roomNumber: 'Room 101',
        motif: '',
        dateDebut: '',
        dateFin: '',
        roomType: 'Standard',
        status: 'Disponible'
    });

    if (!show) return null;

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-3xl relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-center mb-10">Ajouter une disponibilité</h2>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium mb-2">Numéro de chambre</label>
                        <select
                            value={formData.roomNumber}
                            onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            <option>Room 101</option>
                            <option>Room 102</option>
                            <option>Room 103</option>
                            <option>Room 104</option>
                            <option>Room 105</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Motif</label>
                        <input
                            type="text"
                            value={formData.motif}
                            onChange={(e) => setFormData({...formData, motif: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Entrez le motif"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Date de début</label>
                        <input
                            type="date"
                            value={formData.dateDebut}
                            onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Date de fin</label>
                        <input
                            type="date"
                            value={formData.dateFin}
                            onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Type de la chambre</label>
                        <select
                            value={formData.roomType}
                            onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            <option>Standard</option>
                            <option>Suite</option>
                            <option>Luxe</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            <option>Disponible</option>
                            <option>Occupé</option>
                            <option>Hors service</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-medium"
                    >
                        Enregistrer la disponibilité
                    </button>
                </div>
            </div>
        </div>
    );
};