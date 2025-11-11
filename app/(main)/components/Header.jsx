"use client";

import { Search, Settings, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const userInfo = [
    { name: "Jaylon Dorwart", role: "Admin", pathImg: "./images/jaylonprofile.png" },
];

export const Header = () => {
    const pathname = usePathname();

    // Définir le nom de page selon l’URL active
    const pageTitle = useMemo(() => {
        if (pathname === "/") return "Tableau de bord";
        if (pathname.startsWith("/Chambres")) {
            const parts = pathname.split("/");
            const roomNameEncoded = parts[3]; // "Nom%20chambre%201"
            if (roomNameEncoded) {
                const roomName = decodeURIComponent(roomNameEncoded);
                return ` `;
            }
            return "Chambres";
        }
        if (pathname.includes("/reservations")) return "Réservation";
        if (pathname.includes("/finances")) return "Facture";
        if (pathname.includes("/messages")) return "Messages";
        return "Souaba";
    }, [pathname]);

    return (
        <header className="bg-card px-6 py-4 flex items-center justify-between border-b border-gray-50">
            <h1 className="text-2xl font-semibold text-gray-800">{pageTitle}</h1>

            <div className="flex items-center gap-4">
                {/* Barre de recherche */}
                <div className="relative w-64 text-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Rechercher une chambre, un invité, etc."
                        className="w-full h-2/5 pl-10 pr-4 py-2 text-sm rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                {/* Profil utilisateur + icônes */}
                <div className="flex items-center gap-3">
                    {userInfo.map((user, index) => (
                        <div key={index} className="flex items-center gap-2 ml-2">
                            <img
                                src={user.pathImg ?? "./images/jaylonprofile.png"}
                                alt={user.name}
                                className="w-9 h-9 rounded-full"
                            />
                            <div className="text-sm leading-tight">
                                <div className="font-bold">{user.name}</div>
                                <div className="text-muted-foreground text-xs">
                                    {user.role}
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted relative">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                    </button>
                </div>
            </div>
        </header>
    );
};
