"use client";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ModalAdd ({ isOpen, onClose}) {

    if (!isOpen) return null

    // Fonction pour fermer la modale si on clique sur l’arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose(); // on ferme seulement si on clique *sur le fond*, pas sur le contenu
        }
    };
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033]" onClick={handleBackdropClick}>
        <div className="bg-[#FFFFFF] rounded-xl shadow-xl w-[80%] max-w-5xl p-20 relative">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-[#FFFFFF]"
                >
                <X size={22} color="white" className="bg-red-500 rounded-2xl p-1" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 p-6">
                <h2 className="text-xl text-[#0D0E0D] font-semibold">Ajouter un personnel</h2>
            </div>

            {/* Form grid */}
            <div className="grid col-auto gap-4">
            {/* Informations personnelles */}
                <div className="col-span-2 ">
                    <div className="space-y-5 m-15">
                        <div className="rows gap-4 flex justify-between">
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Nom & Prénom :</label>
                                <input
                                    type="text"
                                    className="w-30 border-b border-[#E6E6E6] text-sm flex justify-center focus:outline-none"
                                    name="full_Name"
                                />
                            </div>                            
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Contact :</label>
                                <input
                                    type="text"
                                    className="w-20 border-b border-[#E6E6E6] text-sm flex justify-center focus:outline-none"
                                    name="contact"
                                />
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Email :</label>
                                <input
                                    type="email"
                                    className="w-30 border-b border-[#E6E6E6] text-sm flex justify-center focus:outline-none"
                                    name="email"
                                />
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Genre :</label>
                                <select className="w-30 flex justify-start text-sm focus:outline-none"
                                name="genre"
                                >
                                    <option className="text-[#0D0E0D] flex justify-start">Masculin</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Féminin</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-sm text-[#0D0E0D] flex justify-start">Rôle :</label>
                                <select className="w-30 flex justify-start text-sm focus:outline-none"
                                name="role"
                                >
                                    <option className="text-[#0D0E0D] flex justify-start">Admin</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Réceptionnister</option>
                                    <option className="text-[#0D0E0D] flex justify-start">Responsable Ménage</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="border-l border-black"></div>

            </div>

            {/* Submit button */}
            <div className="mt-10 flex justify-end">
                <button
                    type="button"
                    className="bg-[#F8AA24] text-xs text-[#FFFFFF] px-6 py-2 rounded-md transition-colors"
                >
                    Enregistrer le personnel 
                </button>
            </div>
        </div>
    </div>
    )
}