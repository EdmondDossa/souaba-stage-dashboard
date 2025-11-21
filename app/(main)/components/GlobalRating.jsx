"use client"
import { MoreHorizontal } from "lucide-react";

// TODO: Implémenter un système de notation dans l'API
// En attendant, ces données sont fictives pour la démonstration
const ratings = [
    { label: "Installations", value: 4.4, percent: 88 },
    { label: "Propreté", value: 4.7, percent: 94 },
    { label: "Services", value: 4.6, percent: 92 },
    { label: "Confort", value: 4.8, percent: 96 },
    { label: "Emplacement", value: 4.5, percent: 90 },
];
const Stars =[
    {
        low: 4.6, high: 5, word: "Impressionnant", avis: 2546
    }
]

export const GlobalRating = () => {
    return (
        <div className="bg-card rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Note globale</h3>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Note : Données de démonstration - En attente d'implémentation API */}
            <div className="mb-6">
                {Stars.map((star, index)=>(
                <div key={index} className="flex gap-3 mb-1 space-x-1">
                    <div className={"rounded-xl bg-[#D5F6E5] pt-1"}>
                        <span className="text-4xl font-bold pl-2 font-[Lato]">{star.low}</span>
                        <span className="text-gray-500 text-sm pr-2 pb-2 font-[Lato]">/{star.high}</span>
                    </div>
                    <div className={"flex-1 items-center justify-right"}>
                        <div className="text-lg font-bold mb-1">{star.word}</div>
                        <div className="text-xs text-gray-500">à partir de {star.avis} avis</div>
                    </div>
                </div>
                ))}
            </div>

            <div className="space-y-3">
                {ratings.map((rating, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-500">
                        {/* Label de la note */}
                        <span className="text-sm w-24 text-muted-foreground">{rating.label}</span>

                        {/* Barre de progression */}
                        <div className="relative flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                            {/* Portion colorée */}
                            <div
                                className="absolute left-0 top-0 h-full bg-primary rounded-full"
                                style={{ width: `${rating.percent}%` }}
                            ></div>
                        </div>

                        {/* Valeur numérique */}
                        <span className="text-sm font-semibold w-8 text-right">{rating.value}</span>
                    </div>
                ))}

            </div>
        </div>
    );
};
