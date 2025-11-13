import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Card ({ title, value, trend, icon: Icon, bgColor, bgColorTrend, bgColorIcon }) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className={cn("p-4 rounded-xl", bgColor)}>
            {/* Header avec icône, titre et menu */}
            <div className="flex items-center justify-between mb-auto">
                <div className="flex items-center gap-2">                
                    <div className={cn("w-8 h-8 bg-[#FFFFFF] rounded flex items-center justify-center", bgColorIcon)}>
                        {Icon && <Icon className={"w-4 h-4 text-black"} />}
                    </div>
                    <span className="text-xs text-[#6E6E6E]">{title}</span>             
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal color="#6E6E6E" className="w-5 h-5" />
                </button>
            </div>

            {/* Montant et Trend côte à côte en bas */}
            <div className="flex items-end justify-between mt-12">
                {/* Montant à gauche */}
                <div className="text-2xl font-bold text-[#0D0E0D]">
                    {value}
                </div>

                {/* Trend et "from last week" à droite */}
                {trend !== undefined && (
                    <div className="flex flex-col items-end gap-1">
                        <div className={cn(bgColorTrend, "flex gap-1.5 items-center rounded-full px-2 py-1")}>
                            {isPositive && <TrendingUp className="w-4 h-4" />}
                            {isNegative && <TrendingDown className="w-4 h-4" />}
                            <span className="font-semibold text-xs text-[#0D0E0D]">
                                {trend}%
                            </span>
                        </div>
                        <span className="text-[#A3A3A3] text-xs">
                            from last week
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}