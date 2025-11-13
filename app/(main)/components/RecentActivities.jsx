"use client";
import { MoreHorizontal } from "lucide-react";
import SvgIcon from "@/components/ui/common/SvgIcon";

const activities = [
    {
        time: "12:00 PM",
        title: "Configuration de la salle de conférence",
        description: "L'équipe des événements a installé la salle de conférence B pour la réunion de 10 heures, y compris l'équipement audiovisuel et les rafraîchissements.",
        color: "bg-[#E7F68E]",
        icon: "ChalkboardTeacher"
    },
    {
        time: "11:30 AM",
        title: "Départ des invités",
        description: "Sarah Johnson a terminé le processus de départ et a mis à jour la disponibilité de la chambre 305.",
        color: "bg-[#D5F6E5]",
        icon: "SignOut"
    },
    {
        time: "11:00 AM",
        title: "Nettoyage de la chambre terminé",
        description: "Maria Gonzalez a nettoyé et préparé la chambre 204 pour les nouveaux invités.",
        color: "bg-[#E7F68E]",
        icon: "CircleWavyCheck"
    },
    {
        time: "10:50 AM",
        title: "Demande de maintenance enregistrée",
        description: "Roberta causée dans la chambre 109, demande de maintenance attribuée au technicien.",
        color: "bg-[#D5F6E5]",
        icon: "WarningOctagon"
    },
    {
        time: "10:40 AM",
        title: "Enregistrement des invités",
        description: "Angus Cooper a terminé le processus d'enregistrement et a délivré la clé de la chambre.",
        color: "bg-[#E7F68E]",
        icon: "SignIn"
    },
];

export const RecentActivities = () => {
    return (
        <div className="bg-card rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Activités récentes</h3>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0 text-xs font-semibold`}>
                            <SvgIcon
                                name={activity.icon}
                                size={18}
                                className="text-gray-700"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-xs text-muted-foreground mb-1">{activity.time}</span>
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <span className="text-sm font-semibold">{activity.title}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">{activity.description}</p>
                        </div>
                        <div className={" border border-t h-[50px] relative right-[95%] top-10 border-gray-200"}></div>

                    </div>
                ))}
            </div>
        </div>
    );
};
