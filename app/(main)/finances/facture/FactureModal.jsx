"use client";
import { X } from "lucide-react";


export default function FactureModal({ show, onClose, data }) {
    if (!show) return null;

    // Fonction pour fermer la modale si on clique sur l’arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose(); // on ferme seulement si on clique *sur le fond*, pas sur le contenu
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033]" onClick={handleBackdropClick}>
        <div className="bg-[#FFFFFF] rounded p-10 w-auto relative">
            {/* Bouton de fermeture */}
            <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#FFFFFF]"
            >
            <X size={22} color="white" className="bg-red-500 rounded-2xl p-1" />
            </button>

            <div className="p-6">
            <h2 className="text-center text-[#000000] text-lg font-inter pb-4">Facture</h2>

            {/* Carte facture */}
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 overflow-hidden w-[120%] h-auto    ">
                <div className="relative p-6">
                {/* Bande décorative */}
                <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full bg-gradient-to-b from-orange-400 to-orange-100"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-gradient-to-b from-orange-400 to-orange-100"></div>

                {/* Header facture */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="flex justify-between">
                    <p className="text-xs text-gray-500 mb-1">FACTURE N° :</p>
                    <p className="text-lg font-semibold">00001</p>
                    </div>
                    <div className="flex flex-wrap">
                    <p className="font-semibold mt-2">{data?.name || "John BILL"}</p>
                    <p className="text-sm text-gray-600">{data?.phone || "+225 15 47 58 98"}</p>
                    </div>
                    <div className="text-right">
                    <img
                        src="/logo_souaba.png"
                        alt="Souaba"
                        className="h-10 mx-auto"
                    />
                    <p className="text-sm font-medium mt-1 text-gray-800">
                        CÔTE D'IVOIRE, ABIDJAN
                    </p>
                    <p className="text-xs text-gray-500">hotel@gmail.com</p>
                    </div>
                </div>

                {/* Résumé */}
                <div className="text-center mb-4 relative z-10">
                    <div className="bg-orange-400 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block">
                    Résumer de la réservation
                    </div>
                </div>

                <div className="text-sm space-y-3 relative z-10">
                    <div className="flex justify-between">
                    <span className="text-gray-700">Date de la réservation</span>
                    <span className="font-medium">24 août 2023 10h00</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-700">Date d’arrivée</span>
                    <span className="font-medium">4 octobre 2023</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-700">Date de départ</span>
                    <span className="font-medium">7 octobre 2023</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-700">Nombre de nuits</span>
                    <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-700">Nombre d’invités</span>
                    <span className="font-medium">5 personnes</span>
                    </div>

                    <div className="flex justify-center mt-4">
                    <span className="bg-orange-400 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                        Montant&nbsp; 900.000&nbsp;FCFA
                    </span>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-600 mt-6 relative z-10">
                    Merci de nous faire confiance&nbsp;!
                </p>
                </div>
            </div>

            {/* Boutons d’action */}
            <div className="flex justify-center gap-4 mt-6">
                <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
                Imprimez
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
                Envoyez via Email au client
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}
