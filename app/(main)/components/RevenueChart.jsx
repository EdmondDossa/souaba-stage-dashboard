'use client';

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

// Données brutes
const rawData = [
    { month: "Nov 2027", value: 100000 },
    { month: "Dec 2027", value: 280000 },
    { month: "Jan 2028", value: 250000 },
    { month: "Feb 2028", value: 315060 },
    { month: "Mar 2028", value: 225000 },
    { month: "Apr 2028", value: 390000 },
    { month: "May 2028", value: 250000 },
];

const monthToNumber = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

export const RevenueChart = () => {
    const [data, setData] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterLabel, setFilterLabel] = useState("Les 6 derniers mois");

    // Parser rawData en Date pour trier
    const parsedData = rawData
        .map(item => {
            const [monthStr, yearStr] = item.month.split(" ");
            return { ...item, date: new Date(parseInt(yearStr), monthToNumber[monthStr], 1) };
        })
        .sort((a, b) => a.date - b.date);

    const today = new Date();

    useEffect(() => {
        setData(parsedData.slice(-6)); // par défaut 6 derniers mois
    }, []);

    const handleFilterSelect = (option) => {
        let filteredData;
        if(option.endsWith("mois")) {
            const n = parseInt(option);
            filteredData = parsedData.slice(-n);
            setFilterLabel(`${n} dernier${n>1?'s':''} mois`);
        } else if(option.endsWith("annee")) {
            const n = parseInt(option);
            const currentYear = today.getFullYear();
            filteredData = parsedData.filter(d => d.date.getFullYear() >= currentYear - n + 1 && d.date.getFullYear() <= currentYear);
            setFilterLabel(`${n} dernier${n>1?'s':''} annee${n>1?'s':''}`);
        } else if(option === "semaine") {
            filteredData = parsedData.slice(-1); // approximation dernière semaine sur dernier mois
            setFilterLabel("Dernière semaine");
        }
        setData(filteredData);
        setDropdownOpen(false);
    };

    //personalisation du tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#F8AA24',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px'
                }}>
                    <p style={{
                        color: 'gray',
                        fontSize: '10px',
                        margin: '0 0 4px 0',
                        fontWeight: '400'
                    }}>
                        Revenu total
                    </p>
                    <p style={{
                        color: 'black',
                        fontSize: '14px',
                        margin: 0,
                        fontWeight: '600'
                    }}>
                        ${(payload[0].value / 1000).toFixed(0)}K
                    </p>
                </div>
            );
        }
        return null;
    };


    // Construire dynamiquement les options
    const monthOptions = [9,6,3,1].map(n => ({ key: `${n}mois`, label: `${n} dernier${n>1?'s':''} mois` }));
    const yearOptions = Array.from({ length: 9 }, (_, i) => {
        const n = 9 - i;
        return { key: `${n}annee`, label: `${n} dernier${n>1?'s':''} annee${n>1?'s':''}` };
    });

    return (
        <div className="bg-card rounded-xl p-6 bg-white relative">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Revenu</h3>
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2"
                    >
                        {filterLabel} <ChevronDown className="w-4 h-4"/>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg z-50 border border-gray-200 max-h-80 overflow-auto">
                            <ul className="py-1">
                                {monthOptions.map(opt => (
                                    <li
                                        key={opt.key}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleFilterSelect(opt.key)}
                                    >
                                        {opt.label}
                                    </li>
                                ))}
                                <li className="border-t my-1"></li>
                                {yearOptions.map(opt => (
                                    <li
                                        key={opt.key}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleFilterSelect(opt.key)}
                                    >
                                        {opt.label}
                                    </li>
                                ))}
                                <li className="border-t my-1"></li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterSelect("semaine")}>Dernière semaine</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#D5F6E5B8" stopOpacity={0.8} />
                                <stop offset="72%" stopColor="#D5F6E5B8" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="5 5"
                            stroke="#E5E7EB"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6E6E6E', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}K`}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: '#CCD97E',
                                strokeWidth: 2,
                                strokeDasharray: '5 5'
                            }}
                        />
                        <Area
                            type="natural"
                            dataKey="value"
                            stroke="#CCD97E"
                            strokeWidth={3}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};
