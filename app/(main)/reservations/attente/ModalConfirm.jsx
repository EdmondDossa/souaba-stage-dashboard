import { useState } from "react";

export default function ModalConfirm ({isOpen, isClose, onSave}) {
    const handleSave = () => {
        if (onSave) {
            onClose(); 
        }
    };

    if (!isOpen) return null;

    return (
            <div className="flex gap-3 fixed rounded-lg inset-0 z-50 flex items-center justify-end bg-[#00000033]">
                <div className="bg-[#FFFFFF] rounded-xl shadow-xl w-[30%] p-15 relative">
                    <p className="text-[#000000] font-semibold text-xs">
                        En activant le bouton, vous gardez le contrôle en validant chaque réservation vous-même. En le désactivant, les réservations sont validées instantanément.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button className="text-[#FFFFFF] text-xs bg-[#C94C4C] px-6 py-2 rounded-md transition-colors" type="button" onClick={handleSave}>Annuler</button>
                        <button className="test-[#FFFFFF] text-xs bg-[#F8AA24] px-6 py-2 rounded-md transition-colors" type="button" onClick={handleSave}>Continuer</button>
                    </div>
                </div>
            </div>
    )
}