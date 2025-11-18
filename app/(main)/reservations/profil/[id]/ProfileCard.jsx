export default function ProfileCard() {
return (
<div className="bg-white rounded-2xl shadow-sm p-6">
    <div className="flex items-center gap-4">
        <img
            src="/images/jaylonprofile.png"
            alt="Profile"
            className="w-16 h-16 rounded-full"
        />
        <div>
            <h2 className="text-lg font-semibold">Angus Copper</h2>
            <p className="text-sm text-gray-500">G011-987654321</p>
        </div>
    </div>

    <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p><span className="font-semibold">📞</span> +1 (555) 789-1234</p>
        <p><span className="font-semibold">✉️</span> angus.copper@example.com</p>
    </div>

    <div className="mt-6 border-t pt-4 space-y-2 text-sm">
        <h3 className="font-semibold text-gray-700">Informations personnelles</h3>
        <p>Date de naissance : 15 juin 1985</p>
        <p>Genre : Mâle</p>
        <p>Nationalité : Américain</p>
        <p>Passport No : A4096027</p>
    </div>
</div>
);
}
