'use client';
import { useState } from 'react';

export default function EditCategoryModal({ category, onClose, onSave }) {
    const [formData, setFormData] = useState({
        type: category.type || 'Standard',
        name: category.name || '',
        roomCount: category.roomCount || '',
        capacity: category.capacity || '',
        price: category.price || '',
        bathrooms: category.bathrooms || '',
        description: category.description || '',
        status: category.status || 'Disponible',
        photos: category.photos || category.galleryImages || [],
    });

    const [newPhotos, setNewPhotos] = useState([]);

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        const photoUrls = files.map(file => URL.createObjectURL(file));
        setNewPhotos([...newPhotos, ...photoUrls]);
    };

    const removePhoto = (index, isNew = false) => {
        if (isNew) {
            setNewPhotos(newPhotos.filter((_, i) => i !== index));
        } else {
            setFormData({
                ...formData,
                photos: formData.photos.filter((_, i) => i !== index)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(category.id, {
            ...formData,
            photos: [...formData.photos, ...newPhotos],
        });
    };

    return (
        <div
            className="fixed inset-0 bg-gray-800/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/*On empêche le clic à l’intérieur de fermer le modal */}
            <div
                className="relative bg-white rounded-lg shadow-lg w-[70%] h-[70%] p-2"
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

                <div className="flex justify-center mt-[10%]">
                    <div>
                        <h2 className="flex text-xl justify-center items-center font-bold mb-15">
                            Modifier une catégorie chambre
                        </h2>


                    <form onSubmit={handleSubmit}>
                        {/* Première ligne */}
                        <div className="grid grid-cols-3 gap-36 mb-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Type de chambre
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="focus:outline-none text-xs"
                                >
                                    <option className={"text-xs"} value="Standard">Standard</option>
                                    <option className={"text-xs"} value="Luxe">Luxe</option>
                                    <option className={"text-xs"} value="Suite">Suite</option>
                                    <option className={"text-xs"} value="Supérieure">Supérieure</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Description de la chambre :
                                </label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Plus d'espace et de luxe. Lit king-size, salon séparé, ..."
                                    className="focus:outline-none focus:bg-none text-xs"
                                />
                                <div className={"w-50 text-gray-200 border-b"}></div>
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

                        {/* Deuxième ligne */}
                        <div className="grid grid-cols-3 gap-36">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nombre de chambre
                                </label>
                                <input
                                    type="number"
                                    value={formData.roomCount}
                                    placeholder={"30"}
                                    onChange={(e) => setFormData({ ...formData, roomCount: e.target.value })}
                                    className="focus:outline-none focus:bg-none text-xs"
                                />
                                <div className={"w-40 text-gray-200 border-b"}></div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Capacité d'accueil :
                                </label>
                                <input
                                    type="number"
                                    value={formData.capacity}
                                    placeholder={"3"}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    className="focus:outline-none focus:bg-none"
                                />
                                <div className={"w-40 text-gray-200 border-b"}></div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Prix par nuit
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    placeholder={"900.000"}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="focus:outline-none focus:bg-none text-xs"
                                />
                                <div className={"w-40 text-gray-200 border-b"}></div>
                            </div>

                            </div>
                        {/* Deuxième ligne */}
                        <div className="grid grid-cols-3 gap-36 mt-5">
                            {/* Photos */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold mt-4 text-gray-700 mb-2">
                                    Photos
                                </label>
                                <div className={"border-2 rounded-2xl text-gray-200"}>

                                    {/* Zone d'upload */}
                                    <div className="flex items-center pl-20 w-48 h-36 border-gray-300 rounded-lg p-8 text-center mb-4">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                            id="photo-upload-edit"
                                        />
                                        <label
                                            htmlFor="photo-upload-edit"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-xs text-gray-600 font-bold">Ajouter des photos</span>
                                        </label>
                                    </div>

                                    {/* Aperçu des photos existantes */}
                                    {formData.photos.length > 0 && (
                                        <div>
                                            <p className="text-sm font-bold text-gray-700 mb-2">Photos existantes</p>
                                            <div className="max-h-32 overflow-y-auto grid grid-cols-4 gap-2 mb-4 pr-1">
                                                {formData.photos.map((photo, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="relative group w-full h-24 rounded overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0"
                                                    >
                                                        <img
                                                            src={photo}
                                                            alt={`Photo ${idx + 1}`}
                                                            className="object-cover w-full h-full rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removePhoto(idx, false)}
                                                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Aperçu des nouvelles photos */}
                                    {newPhotos.length > 0 && (
                                        <div>
                                            <div className="max-h-15 overflow-y-auto grid grid-cols-4 gap-2 pr-1">
                                                {newPhotos.map((photo, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="relative group w-12 h-15 rounded overflow-hidden border-2 border-green-500 bg-gray-50"
                                                    >
                                                        <img
                                                            src={photo}
                                                            alt={`Nouvelle photo ${idx + 1}`}
                                                            className="w-12 h-15"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removePhoto(idx, true)}
                                                            className="absolute bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>

                            </div>
                            {/* Nombre de salles de bain */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nombre de salle de bain
                                </label>
                                <input
                                    type="number"
                                    value={formData.bathrooms}
                                    placeholder={"10"}
                                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                                    className="focus:outline-none focus:bg-none"
                                />
                                <div className={"w-40 text-gray-200 border-b"}></div>
                            </div>
                        </div>

                        {/* Bouton submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary text-white px-6 py-2 rounded-lg font-bold"
                            >
                                Modifier la catégorie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}