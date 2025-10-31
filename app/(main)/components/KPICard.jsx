import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const KPICard = ({ title, value, trend, icon: Icon, bgColor, bgColorTrend,bgColorIcon }) => {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className={cn("p-4 rounded-xl", bgColor)}>
            <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-foreground/70">{title}</span>
                <div className={cn("w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center",bgColorIcon)}>
                    <Icon className={"w-4 h-4 text-foreground"} />
                </div>
            </div>
            <div className="text-2xl font-bold mb-1.5 relative top-[-17px] w-[51.313px]">{value}</div>

            {trend !== undefined && (
                <div className="flex items-center gap-1 text-xs">
                    <div className={cn(bgColorTrend, "flex items-center rounded-2xl gap-1 justify-between")}>
                        {isPositive && <TrendingUp className="w-3 h-3 ml-1" />}
                        {isNegative && <TrendingDown className="w-3 h-3 ml-1" />}
                        <span
                            className={cn(
                                "font-medium flex mr-1",
                                isPositive && "text-black",
                                isNegative && "text-black",

                            )}
                        >{" "}
                        {isPositive ? "+" : ""}
                            {trend}%
                    </span>
                    </div>
                    <span className="text-foreground/60 ml-1">
                        de la semaine dernière {" "}
                    </span>
                </div>
            )}
        </div>
    );
};
