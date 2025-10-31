import Link from "next/link";
import {HeaderReservation} from "@/app/(main)/dashboard/components/reservations/HeaderReservation";


export default function ReservationPage() {
    return (
        <div className="flex flex-col gap-4">

            <HeaderReservation/>
            
            <div className="flex gap-2">
                <Link href="/reservations/valide">Validé</Link>
                <Link href="/reservations/attente">En attente</Link>
                <Link href="/reservations/annule">Annulé</Link>
            </div>
        </div>
    );
}