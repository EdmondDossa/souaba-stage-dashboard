
export default function ModalConfirm({ onClose, show }) {
    if (!show) return null;

    // Fonction pour fermer la modale si on clique sur l’arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose(); // on ferme seulement si on clique *sur le fond*, pas sur le contenu
        }
    };
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033]" onClick={handleBackdropClick}>
        <div className="bg-[#FFFFFF] rounded-xl shadow-xl w-[80%] max-w-5xl p-20 relative">
            <h3 className="text-[#0D0E0D] font-[Lato] text-xl">Veuillez saisir l'email du client</h3>
            <form className="flex gap-2">
                <input type="email" name="email" placeholder="john@gmail.com" className="w-full text-[#0D0E0D] border-[#E6E6E6] bg-[#E6E6E6] rounded-md p-2" />
                <button type="submit" className="bg-[#F8AA24] border-[#F8AA24] text-[#FFFFFF] px-4 py-2 rounded-md" onClick={onClose}>Confirmer</button>
            </form>
        </div>
    </div>
    )
}   