import { Search, CalendarDays, Plus, Eye, Edit, CreditCard } from "lucide-react";

export default function ReservationPage() {
  const reservations = [
    { id: "LG-800108", name: "Angus Copper", type: "Deluxe 101", room: "Room 101", checkIn: "June 19, 2028", checkOut: "June 22, 2028", status: "Arrivée" },
    { id: "LG-800109", name: "Catherine Lopp", type: "Standard 202", room: "Room 151", checkIn: "June 19, 2028", checkOut: "June 21, 2028", status: "Départ" },
    { id: "LG-800110", name: "Edgar Irving", type: "Suite 303", room: "Room 103", checkIn: "June 19, 2028", checkOut: "June 24, 2028", status: "Présent" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Arrivée":
        return "bg-yellow-500 text-white";
      case "Présent":
        return "bg-green-500 text-white";
      case "Départ":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Réservation</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border rounded-md px-3 py-1.5 w-64">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher un invité, un statut, etc."
              className="w-full text-sm outline-none"
            />
          </div>
          <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-100">
            <CalendarDays size={16} />
            19 - 24 Juin 2028
          </button>
          <button className="flex items-center gap-2 bg-yellow-500 text-white rounded-md px-3 py-1.5 text-sm hover:bg-yellow-600">
            <Plus size={16} />
            Ajouter une réservation
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-600 text-left">
            <tr>
              <th className="p-3 font-medium">Invité</th>
              <th className="p-3 font-medium">Numéro de réservation</th>
              <th className="p-3 font-medium">Type de chambre</th>
              <th className="p-3 font-medium">Numéro de chambre</th>
              <th className="p-3 font-medium">Check-In & Check-Out</th>
              <th className="p-3 font-medium">Statut</th>
              <th className="p-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{res.name}</td>
                <td className="p-3">{res.id}</td>
                <td className="p-3">{res.type}</td>
                <td className="p-3">{res.room}</td>
                <td className="p-3">
                  {res.checkIn} – {res.checkOut}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      res.status
                    )}`}
                  >
                    {res.status}
                  </span>
                </td>
                <td className="p-3 text-right flex justify-end gap-2">
                  <button className="p-1.5 rounded-md hover:bg-gray-100">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-gray-100">
                    <Edit size={16} />
                  </button>
                  <button className="flex items-center gap-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-md hover:bg-blue-600">
                    <CreditCard size={12} /> Payer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 text-xs text-gray-500 bg-gray-50">
          <span>Showing 1–12 of 385</span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 8].map((num, i) => (
              <button
                key={i}
                className={`px-2 py-1 rounded ${
                  num === 1
                    ? "bg-yellow-500 text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer className="text-xs text-gray-400 mt-8 text-center">
        © 2025 <span className="text-yellow-500 font-medium">Souba</span> — Privacy Policy · Terms · Contact
      </footer>
    </div>
  );
}
