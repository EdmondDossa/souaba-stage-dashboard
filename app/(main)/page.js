"use client";
import { Sidebar } from "@/app/(main)/components/Sidebar";
import { Header } from "@/app/(main)/components/Header";
import { KPICard } from "@/app/(main)/components/KPICard";
import { RoomAvailability } from "@/app/(main)/components/RoomAvailability";
import { RevenueChart } from "@/app/(main)/components/RevenueChart";
import { GlobalRating } from "@/app/(main)/components/GlobalRating";
import { RecentActivities } from "@/app/(main)/components/RecentActivities";
import { ReservationTable } from "@/app/(main)/components/ReservationTable";
import { Calendar, LogIn, LogOut, CircleDollarSign } from "lucide-react";


const Dashboard = () => {
    return (
        <div className="">
            <div className="flex-1 flex flex-col font-[Lato]">
                <main className="flex-1 p-6 overflow-auto">
                    <div className="grid grid-cols-[3fr_1fr] gap-6">
                        {/* Left Section */}
                        <div>
                            {/* KPI Cards */}
                            <div className="grid grid-cols-4 gap-4 mb-6 font-[Lato]">
                                <KPICard
                                    title="Nouvelles réservations"
                                    value="840"
                                    trend={8.70}
                                    icon={Calendar}
                                    bgColor="bg-[#D5F6E5]"
                                    bgColorTrend="bg-white"
                                    bgColorIcon="bg-white"
                                />
                                <KPICard
                                    title="Check-In"
                                    value="231"
                                    trend={3.56}
                                    icon={LogIn}
                                    bgColor="bg-white"
                                    bgColorTrend="bg-[#E7F68E]"
                                    bgColorIcon="bg-[#D5F6E5]"
                                />
                                <KPICard
                                    title="Check-Out"
                                    value="124"
                                    trend={-1.06}
                                    icon={LogOut}
                                    bgColor="bg-white"
                                    bgColorTrend="bg-red-100"
                                    bgColorIcon="bg-[#D5F6E5]"
                                />
                                <KPICard
                                    title="Revenu total"
                                    value="$123,980"
                                    trend={5.70}
                                    icon={CircleDollarSign}
                                    bgColor="bg-white"
                                    bgColorTrend="bg-[#E7F68E]"
                                    bgColorIcon="bg-[#D5F6E5]"

                                />
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-[1fr_2fr] gap-6 mb-6">
                                <RoomAvailability />
                                <RevenueChart />
                            </div>

                            {/* Reservation Table */}
                            <ReservationTable />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <GlobalRating />
                            <RecentActivities />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
