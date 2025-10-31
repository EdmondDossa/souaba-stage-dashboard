"use client";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AddReservationModal({ isOpen, onClose, onSave }) {

    const [ formData, setFormData ] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    genre: "Masculin",
    checkIn: "",
    checkOut: "",
    duree: "",
    invites: "",
    modePaiement: "Cash",
    reservationType: "En présentiel",
    prix: "900.000",        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        if (onSave) {
            onSave(formData); // envoie les infos au parent
            }
            onClose(); // ferme la modale actuelle   
        };

        
    // Fonction pour fermer la modale si on clique sur l’arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose(); // on ferme seulement si on clique *sur le fond*, pas sur le contenu
        }
    };
    
    if (!isOpen) return null;

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleBackdropClick}>
        <div className="bg-white rounded-xl shadow-xl w-[80%] max-w-5xl p-20 relative">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-500 hover:text-red-500"
                >
                <X size={22} color="white" className="bg-red-500 rounded-2xl p-1" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 p-6">
                <h2 className="text-xl font-semibold">Ajouter une réservation</h2>
            </div>

            {/* Header details */}
            <div className="flex justify-between text-gray-800 mb-8 p-6">
                <p className="text-xl font-semibold">
                    Numéro de réservation :{" "}
                    <span className="text-xl font-semibold">LG-B00109</span>
                </p>
                <p className="text-xl font-semibold">
                    Date : <span className="text-xl font-semibold">17 juin 2024, 9h46</span>
                </p>
            </div>

            {/* Form grid */}
            <div className="grid col-auto gap-4">
            {/* Informations personnelles */}
                <div className="col-span-2 ">
                    <h3 className="font-semibold text-center mb-4 text-gray-800">
                        Informations personnelles
                    </h3>

                    <div className="space-y-5 m-15">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600 flex justify-start">Nom </label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 flex justify-start">Prénom </label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 flex justify-start">Email </label>
                            <input
                                type="email"
                                className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 flex justify-start">Téléphone </label>
                            <input
                                type="text"
                                className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                        <div className="">
                                <label className="text-sm text-gray-600 flex justify-start">Genre </label>
                                <select className="w-30 flex justify-start focus:outline-none focus:border-orange-400"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                >
                                    <option>Masculin</option>
                                    <option>Féminin</option>
                                </select>
                        </div>
                    </div>
                </div>

            {/* Separator */}
            <div className="border-l border-black"></div>

                {/* Informations de réservation */}
                <div className="col-end-7 col-span-2">
                    <h3 className="font-semibold text-center mb-4 text-gray-800">
                        Informations de réservation
                    </h3>

                    <div className="space-y-5 space-x-5">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="m-5">
                                <label className="text-sm text-gray-600 flex justify-start">Check In </label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                    name="checkIn"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="m-5">
                                <label className="text-sm text-gray-600 flex justify-start">Check Out </label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                    name="checkOut"
                                    value={formData.checkOut}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="m-5">
                                <label className="text-sm text-gray-600 flex justify-start">Durée </label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                    name="duree"
                                    value={formData.duree}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="m-5">
                                <label className="text-sm text-gray-600 flex justify-start">Invités </label>
                                <input
                                    type="number"
                                    className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                    name="invites"
                                    value={formData.invites}
                                    onChange={handleChange}
                                />
                            </div>

                                <div className="block m-5 p-2">
                                    <label className="text-sm text-gray-600 flex justify-start">
                                        Mode de paiement 
                                    </label>
                                    <select className="w-30 focus:outline-none flex justify-start focus:border-orange-400 mt-2"
                                        name="modePaiement"
                                        value={formData.modePaiement}
                                        onChange={handleChange}
                                    >
                                        <option className="text-gray-600 flex justify-start ">Cash</option>
                                        <option className="text-gray-600 flex justify-start">Mobile Money</option>
                                    </select>
                                </div>

                                <div className="block m-5 mt-7">
                                    <label className="text-sm text-gray-600 flex justify-start">Réservation </label>
                                    <select className="w-30 focus:outline-none flex justify-start focus:border-orange-400 mt-7"
                                        name="reservation"
                                        value={formData.reservation}
                                        onChange={handleChange}
                                    >
                                        <option className="text-gray-600">En présentiel</option>
                                        <option className="text-gray-600">En ligne</option>
                                    </select>
                                </div>

                            <div className="m-5">
                                    <label className="text-sm text-gray-600 flex justify-start">Prix </label>
                                    <input
                                        type="text"
                                        defaultValue="900.000"
                                        className="w-30 border-b border-gray-300 flex justify-start focus:outline-none focus:border-orange-400"
                                        name="prix"
                                        value={formData.prix}
                                        onChange={handleChange}
                                    />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Submit button */}
            <div className="mt-10 flex justify-end">
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-md transition-colors"
                    onClick={handleSave}
                >
                    Enregistrer la réservation
                </button>
            </div>
        </div>
    </div>
);
}
