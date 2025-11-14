const bookings = [
{
id: "LG-B00109",
date: "June 09, 2028",
roomType: "Deluxe",
roomNumber: "101",
checkIn: "June 19, 2024",
checkOut: "June 21, 2024",
guests: "2 Guests",
image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
},
{
id: "LG-B00085",
date: "March 20, 2028",
roomType: "Suite",
roomNumber: "305",
checkIn: "March 25, 2028",
checkOut: "March 30, 2028",
guests: "1 Guest",
image: "https://images.unsplash.com/photo-1600585154154-8c8b94b0d1d9?w=400",
},
];

export default function BookingHistory() {
return (
<div className="bg-white rounded-2xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Historique des réservations</h3>

    <div className="overflow-x-auto">
    <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-600 text-left">
        <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Booking ID</th>
            <th className="p-3">Booking Date</th>
            <th className="p-3">Room Type</th>
            <th className="p-3">Room Number</th>
            <th className="p-3">Check-In</th>
            <th className="p-3">Check-Out</th>
            <th className="p-3">Guests</th>
        </tr>
        </thead>
        <tbody>
        {bookings.map((b, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
            <td className="p-3">
                <img src={b.image} alt="Room" className="w-20 h-14 rounded-md object-cover" />
            </td>
            <td className="p-3 font-medium">{b.id}</td>
            <td className="p-3">{b.date}</td>
            <td className="p-3">
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                {b.roomType}
                </span>
            </td>
            <td className="p-3">{b.roomNumber}</td>
            <td className="p-3">{b.checkIn}</td>
            <td className="p-3">{b.checkOut}</td>
            <td className="p-3">{b.guests}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
</div>
);
}
