'use client';
import { useState } from 'react';

export default function AmenitiesModal({ amenities, onClose, onSave }) {
    const [selectedItems, setSelectedItems] = useState(amenities || []);

    const amenitiesOptions = [
        'Wi-Fi haut débit',
        'Télévision à écran plat',
        'Coffre-fort dans la chambre',
        'Climatisation',
        'Mini-réfrigérateur',
        'cafetière/théière'
    ];

    const toggleItem = (item) => {
        setSelectedItems(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(selectedItems);
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
                            Modification de la commodité
                        </h2>
                        <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {amenitiesOptions.map((option) => (
                            <label
                                key={option}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(option)}
                                    onChange={() => toggleItem(option)}
                                    className="w-5 h-5 text-primary bg-primary rounded focus:ring-2 focus:ring-primary"
                                />
                                <span className="text-sm">{option}</span>
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-end mt-20">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition"
                        >
                            Modifier
                        </button>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </div>
    );
}