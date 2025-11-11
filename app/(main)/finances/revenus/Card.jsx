import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Card ({ title, value, trend, icon: Icon, bgColor, bgColorTrend,bgColorIcon }) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className={cn("p-4 rounded-xl", bgColor)}>
            <div className="flex items-center gap-2 mb-2">                
                <div className={cn("w-8 h-8 bg-[#FFFFFF] rounded flex items-center justify-center",bgColorIcon)}>
                    {Icon && <Icon className={"w-4 h-4 text-black"} />}
                </div>
                <span className="text-xs text-[#6E6E6E]">{title}</span>             
            </div>
            <div className="flex items-center justify-end]">
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal color="#6E6E6E" className="w-5 h-5" />
                </button>
            </div>

            <div className="text-2xl items-end flex font-bold gap-5 text-[#0D0E0D]">
                {value}
            </div>

            <div className="flex justify-end text-xs font-bold mb-1.5 mr-3 ">
                {trend !== undefined && (
                    <div className="flex items-center gap-1 text-xs">
                        <div className={cn(bgColorTrend, "flex gap-2 items-center rounded-lg")}>
                                {isPositive && <TrendingUp className="w-4 h-4" />}
                                {isNegative && <TrendingDown className="w-4 h-4" />}
                                <span
                                    className={cn(
                                        "font-medium flex",
                                        isPositive && "text-[#0D0E0D]",
                                        isNegative && "text-[#0D0E0D]",

                                    )}
                                >{" "}
                                {isPositive ? "" : ""}
                                    {trend}%
                            </span>
                            
                        </div>
                        

                    </div>
                )}
            </div>
            <div className="flex justify-end ">
                <span className="text-[#A3A3A3] text-xs flex justify-end">
                    from last week {" "}
                </span>
            </div>
        </div>
    );
};
