"use client";
import { X } from "lucide-react";
import ModalConfirm from "./ModalConfirm";
import { useState } from "react";

export default function FactureModal({ show, onClose, data }) {
    const [showConfirm, setShowConfirm] = useState(false); // modal confirme

    if (!show) return null;

    // Fermeture en cliquant sur le backdrop
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Ouvrir la modal de confirmation
    const handleSendEmail = () => {
        onClose();             // on ferme la modale de facture
        setShowConfirm(true);  // on ouvre la modale confirm
    };

    return (
        <>
            {/* MODALE FACTURE */}
            <div
                className="flex gap-3 fixed rounded-lg inset-0 z-50 items-center justify-center bg-[#00000033]"
                onClick={handleBackdropClick}
            >
                <div className="bg-[#FFFFFF] rounded shadow-2xl max-w-md w-full relative overflow-hidden">

                    {/* Bouton de fermeture */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-[#FFFFFF]"
                    >
                        <X size={22} color="white" className="bg-red-500 rounded-2xl p-1" />
                    </button>

                    <div className="p-6">
                        <h2 className="text-center text-[#000000] text-lg font-inter pb-4">
                            Facture
                        </h2>

                        {/* Carte facture */}
                        <div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 overflow-hidden w-full h-auto">
                            <div className="relative p-6">

                                {/* Bande décorative */}
                                <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full bg-gradient-to-b from-orange-400 to-orange-100"></div>
                                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-gradient-to-b from-orange-400 to-orange-100"></div>

                                {/* Logo */}
                                <div className="flex justify-end mb-8">
                                    <img
                                        src="/logo_souaba.png"
                                        alt="Souaba"
                                        className="h-10 mx-auto"
                                    />
                                </div>

                                {/* Header facture */}
                                <div className="flex justify-between mb-6 text-sm">
                                    <div>
                                        <p className="text-[#000000] font-medium text-xs mb-1">
                                            FACTURE N° :
                                            <span className="font-semibold"> 00001</span>
                                        </p>
                                        <p className="font-bold text-[#000000] text-base mt-3">
                                            John BILL
                                        </p>
                                        <p className="text-[#000000] text-xs">+225 15 47 58 98</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-[#000000] text-xs">
                                            CÔTE D'IVOIRE, ABIDJAN
                                        </p>
                                        <p className="text-[#6E6E6E] text-xs italic">hotel@gmail.com</p>
                                    </div>
                                </div>

                                {/* Résumé */}
                                <div className="text-center mb-4 relative z-10">
                                    <div className="bg-[#F8AA24] text-[#FFFFFF] text-xs font-semibold w-[60%] px-4 py-1 rounded-full inline-block">
                                        Résumer de la réservation
                                    </div>
                                </div>

                                <div className="text-sm space-y-3 relative z-10">
                                    <div className="flex justify-between">
                                        <span className="text-[#6E6E6E]">Date de la réservation</span>
                                        <span className="font-medium">24 août 2023 10h00</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-[#6E6E6E]">Date d’arrivée</span>
                                        <span className="font-medium">4 octobre 2023</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-[#6E6E6E]">Date de départ</span>
                                        <span className="font-medium">7 octobre 2023</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-[#6E6E6E]">Nombre de nuits</span>
                                        <span className="font-medium">3</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-[#6E6E6E]">Nombre d’invités</span>
                                        <span className="font-medium">5 personnes</span>
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <span className="bg-[#F8AA24] text-[#FFFFFF] text-sm font-semibold px-4 py-1.5 rounded-full">
                                            Montant 900.000 FCFA
                                        </span>
                                    </div>
                                </div>

                                <p className="text-xs font-semibold text-[#000000] mt-6 relative z-10">
                                    Merci de nous faire confiance !
                                </p>
                            </div>
                        </div>

                        {/* Boutons action */}
                        <div className="flex justify-end gap-3 mt-6">

                            <button className="bg-[#D70A0A] text-white px-4 py-2 rounded-md text-sm">
                                Imprimez
                            </button>

                            <button
                                className="bg-[#29B06F] text-white px-4 py-2 rounded-md text-sm"
                                onClick={showConfirm}
                            >
                                Envoyez via Email au client
                            </button>
                            {/* MODALE CONFIRMATION */}
                                {showConfirm && (
                                    <ModalConfirm
                                        show={showConfirm}
                                        onClose={() => setShowConfirm(true)}
                                    />
                                )}
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
}
