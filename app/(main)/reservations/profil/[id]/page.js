import ProfileCard from "./ProfileCard";
import BookingInfo from "./BookingInfo";
import RoomInfo from "./RoomInfo";
import BookingHistory from "./BookingHistory";

export default function Home() {
return (
<main className="min-h-screen bg-gray-50 p-6">
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
    <div className="col-span-1">
        <ProfileCard />
    </div>

    <div className="col-span-1">
        <BookingInfo />
    </div>

    <div className="col-span-1">
        <RoomInfo />
    </div>
    </div>

    <BookingHistory />
</main>
);
}
