export default function RoomInfo() {
return (
<div className="bg-white rounded-2xl shadow-sm p-6">
    <div className="flex justify-between items-center mb-3">
    <h3 className="text-gray-700 font-semibold">Informations sur la chambre</h3>
    <a href="#" className="text-sm text-blue-600 hover:underline">Voir les détails</a>
    </div>

    <img
    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400"
    alt="Chambre"
    className="rounded-xl mb-4"
    />

    <div className="text-sm text-gray-700 space-y-1 mb-4">
    <p>🛏️ 35 m² &nbsp;&nbsp; | &nbsp;&nbsp; Très grand lit &nbsp;&nbsp; | &nbsp;&nbsp; 2 invités</p>
    </div>

    <div className="bg-gray-50 rounded-lg p-4">
    <h4 className="font-semibold text-gray-700 mb-2">Résumé des prix <span className="text-green-600 font-medium">(Payé)</span></h4>
    <p>Chambre et offre : $450.00</p>
    <p>Suppléments : $0.00</p>
    <p>8% TVA : $36.00</p>
    <p>Taxe de séjour : $49.50</p>
    <p className="font-bold mt-2">Prix total : $535.50</p>
    </div>

    <p className="text-xs text-gray-500 mt-3">
    Facture envoyée au compte de l’entreprise ; paiement confirmé par BIG Corporation.
    </p>
</div>
);
}
