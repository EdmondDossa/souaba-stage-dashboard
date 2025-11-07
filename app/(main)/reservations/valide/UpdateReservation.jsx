"use client";
import { X, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

export default function UpdateReservationModal({ isOpen, onClose, onSave }) {

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033]" onClick={handleBackdropClick}>
        <div className="bg-[#FFFFFF] rounded-xl shadow-xl w-[60%] max-w-5xl p-20 relative">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-[#FFFFFF]"
                >
                <X size={22} color="white" className="bg-red-500 rounded-2xl p-1" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 p-6">
                <h2 className="text-xl text-[#0D0E0D] font-semibold">Modifier une réservation</h2>
            </div>

            {/* Header details */}
            <div className="flex justify-between text-gray-800 mb-8 p-6">
                <p className="text-xl text-[#0D0E0D] font-medium">
                    Numéro de réservation :{" "}
                    <span className="text-xl text-[#0D0E0D] font-medium">LG-B00109</span>
                </p>
                <p className="text-xl text-[#0D0E0D] font-medium">
                    Date : <span className="text-xl font-medium">17 juin 2024, 9h46</span>
                </p>
            </div>

            {/* Form grid */}
            <div className="grid col-auto gap-4">
            {/* Informations personnelles */}
                <div className="col-span-2 ">
                    <h3 className="font-semibold text-center mb-4 text-[#0D0E0D]">
                        Informations personnelles
                    </h3>

                    <div className="space-y-5 m-15">
                        <div className="rows gap-4 flex justify-between">
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Nom :</label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                    name="nom"
                                    placeholder="BILL"
                                    value={formData.nom}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Prénom :</label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                    name="prenom"
                                    placeholder="Jean"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    <div className="rows gap-4 flex justify-between">
                        <div className="col">
                            <label className="text-sm text-[#0D0E0D] flex justify-start">Email :</label>
                            <input
                                type="email"
                                className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                name="email"
                                placeholder="jean.bill@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label className="text-sm text-[#0D0E0D] flex justify-start">Téléphone :</label>
                            <input
                                type="text"
                                className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                name="telephone"
                                placeholder="+225 47 85 95 21"
                                value={formData.telephone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="rows gap-4 flex justify-between">
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Genre :</label>
                                <select className="w-30 flex justify-start text-sm focus:outline-none"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                >
                                    <option className="text-[#0D0E0D] flex justify-start">Masculin</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Féminin</option>
                                </select>
                        </div>
                    </div>  
                </div>
            </div>

            {/* Separator */}
            <div className="border-l border-black"></div>

                {/* Informations de réservation */}
                <div className="col-end-7 col-span-2">
                    <div className="flex justify-start items-center gap-6 mb-10">
                        <h3 className="font-semibold text-center mb-4 text-[#0D0E0D]">
                            Informations de réservation
                        </h3>
                        <div className="bg-[#F8AA2480] rounded-2xl text-sm mb-4 text-[#0D0E0D] font-semibold flex justify-center items-center">
                            <Check size={16} color="#0D0E0D" className="h-5 w-5" />
                                Arrivé
                        </div>
                    </div>

                    <div className="space-y-5 space-x-5">
                        <div className="rows gap-4 flex justify-between">
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Check In :</label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                    name="checkIn"
                                    placeholder="June20, 2028"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Check Out </label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                    name="checkOut"
                                    placeholder="June23, 2028"
                                    value={formData.checkOut}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Durée </label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                    name="duree"
                                    placeholder="3"
                                    value={formData.duree}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="rows flex justify-between">
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Invités </label>
                                <input
                                    type="number"
                                    className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                    name="invites"
                                    placeholder="3"
                                    value={formData.invites}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className=" col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">
                                    Mode de paiement 
                                </label>
                                <select className="w-30 focus:outline-none text-sm flex justify-start mt-3"
                                    name="modePaiement"
                                    value={formData.modePaiement}
                                    onChange={handleChange}
                                >
                                    <option className="text-[#0D0E0D] flex justify-start">Mobile Money</option>
                                    <option className="text-[#0D0E0D] flex justify-start ">Cash</option>
                                </select>
                            </div>

                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Réservation </label>
                                <select className="w-30 focus:outline-none text-sm flex justify-start mt-3"
                                    name="reservation"
                                    value={formData.reservation}
                                    onChange={handleChange}
                                >
                                    <option className="text-[#0D0E0D] flex justify-start">En ligne</option>
                                    <option className="text-[#0D0E0D] flex justify-start">En présentiel</option>
                                </select>
                            </div>
                        </div>
                        <div className="rows flex justify-between">
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Prix </label>
                                <input
                                    type="text"
                                    defaultValue="900.000"
                                    className="w-30 border-b border-gray-300 text-sm flex justify-start focus:outline-none"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Type de chambre </label>
                                <select className="w-30 focus:outline-none text-sm flex justify-start mt-3"
                                    name="reservation"
                                    value={formData.reservation}
                                    onChange={handleChange}
                                >
                                    <option className="text-[#0D0E0D] flex justify-start">Standart</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Deluxe</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Suite</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Numero de chambre </label>
                                <select className="w-30 focus:outline-none text-sm flex justify-start mt-3"
                                    name="reservation"
                                    value={formData.reservation}
                                    onChange={handleChange}
                                >
                                    <option className="text-[#0D0E0D] flex justify-start">Room 101</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 151</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 103</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 254</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 204</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 110</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 184</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 300</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 356</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 547</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 654</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Room 109</option>
                                </select>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* Submit button */}
            <div className="mt-10 flex justify-end">
                <button
                    type="button"
                    className="bg-[#F8AA2480] text-xs text-[#FFFFFF] px-6 py-2 rounded-md transition-colors"
                    onClick={handleSave}
                >
                    Modifier la réservation
                </button>
            </div>
        </div>
    </div>
);
}
