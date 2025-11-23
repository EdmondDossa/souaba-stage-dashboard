"use client";

import { Search, Settings, Bell, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const userInfo = [
    { name: "Jaylon Dorwart", role: "Admin", pathImg: "/images/jaylonprofile.png" },
];

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter();

    // Définir le nom de page selon l'URL active
    const pageTitle = useMemo(() => {
        if (pathname === "/") return "Tableau de bord";
        if (pathname.startsWith("/Chambres")) {
            const parts = pathname.split("/");
            const roomNameEncoded = parts[3];
            if (roomNameEncoded) {
                const roomName = decodeURIComponent(roomNameEncoded);
                return ` `;
            }
            return "Chambres";
        }
        if (pathname.includes("/reservations/profil/")) return "Profil d'invité";
        if (pathname.includes("/reservations")) return "Réservation";
        if (pathname.includes("/finances/facture")) return "Facture";
        if (pathname.includes("/finances/revenus")) return "Revenu";
        if (pathname.includes("/messages")) return "Messages";
        if (pathname.includes("/menage")) return "Ménage";
        if (pathname.includes("/disponibilite")) return "Disponibilité";
        if (pathname.includes("/personnel")) return "Le personnel";
        return "Souaba";
    }, [pathname]);

    return (
        <>
        <header className="bg-card px-6 py-4 flex items-center justify-between border-b border-gray-50">
            { pathname.includes("/reservations/profil/") ? (
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => router.back()}
                        className="bg-[#FFFFFF] w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                        <ArrowLeft color="#0D0E0D" className="w-4 h-4" />
                    </button>
                    <div className="mt-4">
                        <h1 className="text-2xl font-semibold text-gray-800">{pageTitle}</h1>
                        <p className="text-[#6E6E6E] text-xs font-medium mt-1">
                            <span className="text-[#F8AA24] text-xs font-medium">Réservation</span> / Profil d'invité
                        </p>
                    </div>
                </div>
            ) :  <h1 className="text-2xl font-semibold text-gray-800">{pageTitle}</h1>
            }

            <div className="flex items-center gap-4">
                {/* Barre de recherche  presente uniquement sur la page Dashboard*/}
                {pathname === "/" ? (
                    <div className="relative w-64 text-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Rechercher une chambre, un invité, etc."
                            className="w-full h-2/5 pl-10 pr-4 py-2 text-sm rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                ) : (<div></div>)}

                {/* Profil utilisateur + icônes */}
                <div className="flex items-center gap-3">
                    {userInfo.map((user, index) => (
                        <div key={index} className="flex items-center gap-2 ml-2">
                            <img
                                src={user.pathImg}
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
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#FFFFFF]">
                        <Settings color="#6E6E6E" className="w-5 h-5" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#FFFFFF] relative">
                        <Bell color="#6E6E6E" className="w-5 h-5" />
                        <span className="absolute top-1 bg-red-500 right-1 w-2 h-2 rounded-full" />
                    </button>
                </div>
            </div>
        </header>
        </>
    );

};