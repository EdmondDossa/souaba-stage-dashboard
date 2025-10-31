import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Card ({ title, value, trend, icon: Icon, bgColor, bgColorTrend,bgColorIcon }) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className={cn("p-4 rounded-xl", bgColor)}>
            <div className="flex items-start justify-between mb-2">                
                <div className={cn("w-8 h-8 bg-white/30 rounded flex items-center justify-center",bgColorIcon)}>
                    {Icon && <Icon className={"w-4 h-4 text-black"} />}
                </div>
                <span className="text-sm text-black text-foreground/70">{title}</span>

                <div className="flex items-start">
                    <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="text-2xl font-bold mb-1.5">{value}</div>

            {trend !== undefined && (
                <div className="flex items-center gap-1 text-xs">
                    <div className={cn(bgColorTrend, "grid grid-cols-2 items-center rounded-2xl gap-1 justify-between")}>
                        {isPositive && <TrendingUp className="w-3 h-3 text-black" />}
                        {isNegative && <TrendingDown className="w-3 h-3 text-black" />}
                        <span
                            className={cn(
                                "font-medium flex",
                                isPositive && "text-black",
                                isNegative && "text-black",

                            )}
                        >{" "}
                        {isPositive ? "" : ""}
                            {trend}%
                    </span>
                    </div>
                    <span className="text-gray-150 text-sm flex justify-end">
                        from last week {" "}
                    </span>
                </div>
            )}
        </div>
    );
};
