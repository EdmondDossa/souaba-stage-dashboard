"use client";
import { MoreHorizontal } from "lucide-react";
import SvgIcon from "@/components/ui/common/SvgIcon";
import { useRecentActivities } from "@/lib/api-routes";

export const RecentActivities = () => {
    const { data: activities, loading } = useRecentActivities();

    return (
        <div className="bg-card rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Activités récentes</h3>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {loading ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                    Chargement des activités...
                </div>
            ) : activities.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                    Aucune activité récente
                </div>
            ) : (
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
                            {index < activities.length - 1 && (
                                <div className="border border-t h-[50px] relative right-[95%] top-10 border-gray-200"></div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
