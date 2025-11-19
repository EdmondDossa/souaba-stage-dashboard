"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/app/(main)/components/Sidebar";
import { Header } from "@/app/(main)/components/Header";
import { KPICard } from "@/app/(main)/components/KPICard";
import { RoomAvailability } from "@/app/(main)/components/RoomAvailability";
import { RevenueChart } from "@/app/(main)/components/RevenueChart";
import { GlobalRating } from "@/app/(main)/components/GlobalRating";
import { RecentActivities } from "@/app/(main)/components/RecentActivities";
import { ReservationTable } from "@/app/(main)/components/ReservationTable";
import { Calendar, LogIn, LogOut, CircleDollarSign } from "lucide-react";
import getAxiosInstance from "@/lib/request";


const Dashboard = () => {
    const [kpiData, setKpiData] = useState({
        newReservations: { value: 0, trend: 0 },
        checkIns: { value: 0, trend: 0 },
        checkOuts: { value: 0, trend: 0 },
        totalRevenue: { value: 0, trend: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKPIData = async () => {
            try {
                setLoading(true);
                const axios = getAxiosInstance();

                // Récupérer les réservations
                const reservationsRes = await axios.get('/reservations');
                const reservations = Array.isArray(reservationsRes.data?.data) ? reservationsRes.data.data : [];

               // console.log('Dashboard Total réservations:', reservations.length);
             //   console.log('Dashboard Première réservation:', reservations[0]);

                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

             /*   console.log('[Dashboard] Today:', today);
                console.log('[Dashboard] Last week:', lastWeek);
                console.log('[Dashboard] Two weeks ago:', twoWeeksAgo);
*/
                // Fonction helper pour obtenir la date de manière flexible
                const getDate = (dateStr) => {
                    if (!dateStr) return null;
                    const date = new Date(dateStr);
                    return isNaN(date.getTime()) ? null : date;
                };

                // KPIs de cette semaine
                const thisWeekReservations = reservations.filter(r => {
                    const createdAt = getDate(r.createdAt);
                    return createdAt && createdAt >= lastWeek && createdAt <= today;
                });

            //    console.log('Dashboard This week reservations:', thisWeekReservations.length, thisWeekReservations);

                const thisWeekCheckIns = reservations.filter(r => {
                    const checkIn = getDate(r.check_in_date || r.checkInDate);
                    return checkIn && checkIn >= lastWeek && checkIn <= today && r.status === 'CHECKED_IN';
                });

            //    console.log('Dashboard This week check-ins:', thisWeekCheckIns.length);

                const thisWeekCheckOuts = reservations.filter(r => {
                    const checkOut = getDate(r.check_out_date || r.checkOutDate);
                    return checkOut && checkOut >= lastWeek && checkOut <= today && r.status === 'CHECKED_OUT';
                });

                //console.log('Dashboard This week check-outs:', thisWeekCheckOuts.length);

                const thisWeekRevenue = reservations
                    .filter(r => {
                        const createdAt = getDate(r.createdAt);
                        const isValid = createdAt && createdAt >= lastWeek && createdAt <= today && r.status !== 'CANCELLED';
                        if (isValid) {
                            console.log('💰 Revenue entry:', r.reservation_id, r.total_price || r.totalPrice, r.createdAt);
                        }
                        return isValid;
                    })
                    .reduce((sum, r) => {
                        const price = parseFloat(r.total_price || r.totalPrice || 0);
                        return sum + (isNaN(price) ? 0 : price);
                    }, 0);

            //    console.log('Dashboard This week revenue:', thisWeekRevenue);

                // KPIs semaine précédente
                const lastWeekReservations = reservations.filter(r => {
                    const createdAt = getDate(r.createdAt);
                    return createdAt && createdAt >= twoWeeksAgo && createdAt < lastWeek;
                });

                const lastWeekCheckIns = reservations.filter(r => {
                    const checkIn = getDate(r.check_in_date || r.checkInDate);
                    return checkIn && checkIn >= twoWeeksAgo && checkIn < lastWeek && r.status === 'CHECKED_IN';
                });

                const lastWeekCheckOuts = reservations.filter(r => {
                    const checkOut = getDate(r.check_out_date || r.checkOutDate);
                    return checkOut && checkOut >= twoWeeksAgo && checkOut < lastWeek && r.status === 'CHECKED_OUT';
                });

                const lastWeekRevenue = reservations
                    .filter(r => {
                        const createdAt = getDate(r.createdAt);
                        return createdAt && createdAt >= twoWeeksAgo && createdAt < lastWeek && r.status !== 'CANCELLED';
                    })
                    .reduce((sum, r) => {
                        const price = parseFloat(r.total_price || r.totalPrice || 0);
                        return sum + (isNaN(price) ? 0 : price);
                    }, 0);

                const calculateTrend = (current, previous) => {
                    if (previous === 0) return current > 0 ? 100 : 0;
                    return Number((((current - previous) / previous) * 100).toFixed(2));
                };

                setKpiData({
                    newReservations: {
                        value: thisWeekReservations.length,
                        trend: calculateTrend(thisWeekReservations.length, lastWeekReservations.length)
                    },
                    checkIns: {
                        value: thisWeekCheckIns.length,
                        trend: calculateTrend(thisWeekCheckIns.length, lastWeekCheckIns.length)
                    },
                    checkOuts: {
                        value: thisWeekCheckOuts.length,
                        trend: calculateTrend(thisWeekCheckOuts.length, lastWeekCheckOuts.length)
                    },
                    totalRevenue: {
                        value: thisWeekRevenue,
                        trend: calculateTrend(thisWeekRevenue, lastWeekRevenue)
                    }
                });

               /* console.log('Dashboard KPI Data set:', {
                    newReservations: thisWeekReservations.length,
                    checkIns: thisWeekCheckIns.length,
                    checkOuts: thisWeekCheckOuts.length,
                    totalRevenue: thisWeekRevenue
                });*/
            } catch (err) {
                console.error('Erreur lors de la récupération des KPIs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchKPIData();
    }, []);

    // Formater le revenu
    const formatRevenue = (value) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value.toFixed(0)}`;
    };

    return (
        <div className="">
            <div className="flex-1 flex flex-col font-[Lato]">
                <main className="flex-1 p-6 overflow-auto">
                    <div className="grid grid-cols-[3fr_1fr] gap-6">
                        {/* Left Section */}
                        <div>
                            {/* KPI Cards */}
                            {loading ? (
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-4 mb-6 font-[Lato]">
                                    <KPICard
                                        title="Nouvelles réservations"
                                        value={kpiData.newReservations.value.toString()}
                                        trend={kpiData.newReservations.trend}
                                        icon={Calendar}
                                        bgColor="bg-[#D5F6E5]"
                                        bgColorTrend="bg-white"
                                        bgColorIcon="bg-white"
                                    />
                                    <KPICard
                                        title="Check-In"
                                        value={kpiData.checkIns.value.toString()}
                                        trend={kpiData.checkIns.trend}
                                        icon={LogIn}
                                        bgColor="bg-white"
                                        bgColorTrend="bg-[#E7F68E]"
                                        bgColorIcon="bg-[#D5F6E5]"
                                    />
                                    <KPICard
                                        title="Check-Out"
                                        value={kpiData.checkOuts.value.toString()}
                                        trend={kpiData.checkOuts.trend}
                                        icon={LogOut}
                                        bgColor="bg-white"
                                        bgColorTrend={kpiData.checkOuts.trend >= 0 ? "bg-[#E7F68E]" : "bg-red-100"}
                                        bgColorIcon="bg-[#D5F6E5]"
                                    />
                                    <KPICard
                                        title="Revenu total"
                                        value={formatRevenue(kpiData.totalRevenue.value)}
                                        trend={kpiData.totalRevenue.trend}
                                        icon={CircleDollarSign}
                                        bgColor="bg-white"
                                        bgColorTrend="bg-[#E7F68E]"
                                        bgColorIcon="bg-[#D5F6E5]"
                                    />
                                </div>
                            )}

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
