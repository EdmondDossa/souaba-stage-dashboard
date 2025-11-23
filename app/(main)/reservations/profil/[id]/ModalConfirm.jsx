"use client";
import { X } from "lucide-react";

export default function ModalConfirm({ onClose, show, onConfirm }) {
    
    if (!show) return null; // Ne rien rendre si la modale n'est pas affichée

    // Fonction pour fermer la modale si on clique sur l'arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) { 
            onClose(); // on ferme seulement si on clique sur le fond, pas sur le contenu
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onConfirm) {
            onConfirm(); // on exécute l'action de confirmation passée en prop
        } else {
            onClose(); // On ferme par défaut si aucune action spécifique n'est fournie
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] transition-opacity duration-300 animate-in fade-in" 
            onClick={handleBackdropClick}
        >
            {/* Contenu de la modale */}
            <div className="bg-[#FFFFFF] rounded-xl shadow-xl w-[80%] max-w-5xl p-20 relative transform transition-all duration-300 scale-100 animate-in zoom-in">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 hover:scale-110 transition-transform z-10"
                >
                    <X size={22} color="white" className="bg-red-500 rounded-2xl p-1" />
                </button>
                
                <h3 className="text-[#0D0E0D] font-[Lato] text-xl mb-4">Veuillez saisir l'email du client</h3>
                <form className="flex gap-2" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="john@gmail.com" 
                        className="w-full text-[#0D0E0D] border-[#E6E6E6] bg-[#E6E6E6] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F8AA24]" 
                        required
                    />
                    <button 
                        type="submit" 
                        className="bg-[#F8AA24] border-[#F8AA24] text-[#FFFFFF] px-4 py-2 rounded-md hover:bg-[#e09a1a] transition-colors" 
                    >
                        Confirmer
                    </button>
                </form>
            </div>
        </div>
    );
}