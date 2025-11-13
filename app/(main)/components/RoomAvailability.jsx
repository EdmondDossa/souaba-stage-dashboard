import { MoreHorizontal } from "lucide-react";

const stats = [
    { label: "Occupée", value: 286, color: "bg-[#D5F6E5]" },
    { label: "Réservée", value: 87, color: "bg-[#F3FBC7]" },
    { label: "Disponible", value: 32, color: "bg-[#E7F68E]" },
    { label: "Pas prêt", value: 13, color: "bg-[#CCD97E]" },
];

export const RoomAvailability = () => {
    return (
        <div className="bg-card rounded-xl p-6 bg-white max-h-4/5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Disponibilité des chambres</h3>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className={`w-1.5 h-12 rounded-full ${stat.color}`} />
                        <div>
                            <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
