export default function BookingInfo() {
return (
<div className="bg-white rounded-2xl shadow-sm p-6">
    <div className="flex justify-between items-center mb-4">
    <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Présent</span>
    <p className="text-sm text-gray-500">17 juin 2024, 9:46</p>
    </div>

    <h2 className="text-xl font-semibold mb-2">
    Numéro de réservation : <span className="text-gray-700">LG-B00109</span>
    </h2>

    <div className="space-y-2 text-sm text-gray-700 mb-4">
    <p><strong>Type de chambre :</strong> Luxe</p>
    <p><strong>Numéro :</strong> 101</p>
    <p><strong>Prix :</strong> $150/night</p>
    <p><strong>Invités :</strong> 2 adultes</p>
    <p><strong>Mode de paiement :</strong> Cash</p>
    <p><strong>Réservation :</strong> En présentiel</p>
    </div>

    <div className="text-sm text-gray-700 space-y-1 mb-4">
    <p><strong>Check In:</strong> June 19, 2024 - 1:45 PM</p>
    <p><strong>Check Out:</strong> June 22, 2024 - 11:45 AM</p>
    <p><strong>Durée :</strong> 3 nuits</p>
    </div>

    <div className="text-sm text-gray-600 mb-4">
    <p>Les clients ont demandé des oreillers et des serviettes supplémentaires. Veuillez vous assurer que le service en chambre est disponible à l’arrivée.</p>
    </div>

    <div className="text-sm mb-6">
    <h3 className="font-semibold mb-1">Équipements spéciaux</h3>
    <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>Petit-déjeuner gratuit</li>
        <li>Wi-Fi gratuit</li>
        <li>Accès à la salle de sport et à la piscine</li>
    </ul>
    </div>

    <div className="flex gap-4">
    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Payer</button>
    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Annuler la réservation</button>
    </div>
</div>
);
}
