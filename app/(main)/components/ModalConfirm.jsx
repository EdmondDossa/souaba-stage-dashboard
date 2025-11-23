import { useState } from "react";

export default function ModalConfirm ({isOpen, onClose, onSave}) {
    const handleSave = () => {
        if (onSave) 
            onSave(); //Change l’état du toggle
    };

    // Fonction pour fermer la modale si on clique sur l’arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose(); // on ferme seulement si on clique *sur le fond*, pas sur le contenu
        }
    };

    if (!isOpen) return null;

    return (
            <div className="flex gap-3 fixed rounded-lg inset-0 z-50 flex items-center justify-center bg-[#00000033]" onClick={handleBackdropClick}>
                <div className="bg-[#FFFFFF] rounded-xl shadow-xl w-[30%] p-15 relative">
                    <p className="text-[#000000] font-semibold text-xs">
                        En activant le bouton, vous gardez le contrôle en validant chaque réservation vous-même. En le désactivant, les réservations sont validées instantanément.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button className="text-[#FFFFFF] text-xs bg-[#C94C4C] px-6 py-2 rounded-md transition-colors" type="button" onClick={onClose}>Annuler</button>
                        <button className="test-[#FFFFFF] text-xs bg-[#F8AA24] px-6 py-2 rounded-md transition-colors" type="button" onClick={handleSave}>Continuer</button>
                    </div>
                </div>
            </div>
    )
}