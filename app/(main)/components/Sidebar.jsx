"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SvgIcon } from "@/components/ui/common";
import { useRouter, usePathname } from "next/navigation";

const menuItems = [
    { icon: "SquaresFour", label: "Tableau de bord", href: "/" },
    { icon: "CalendarCheck", label: "Réservation", href: "/reservations" },
    { icon: "HouseLine", label: "Chambres", href: "/Chambres" },
    { icon: "ChatText", label: "Messages", badge: 7, href: "/messages" },
    { icon: "HandSoap", label: "Ménage", href: "/menage" },
    { icon: "CalendarSidebar", label: "Disponibilité", href: "/disponibilite" },
    { icon: "IconMoney", label: "Finances", href: "/finances" },
    { icon: "IdentificationBadge", label: "Le personnel", href: "/personnel" },
];

const dropDownReservation = [
    { label: "Validé", href: "/reservations/valide" },
    { label: "En attente", href: "/reservations/attente" },
    { label: "Annuler", href: "/reservations/annule" },
];

const dropDownFinance = [
    { label: "Facture", href: "/finances/facture" },
    { label: "Revenus", href: "/finances/revenus" },
];

export const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    // état pour garder ouvert le dropdown actif
    const [openDropdown, setOpenDropdown] = useState(null);

    return (
        <aside className="w-[200px] bg-white flex flex-col border-r border-gray-200">
            {/* LOGO */}
            <div className="p-4 flex justify-center mb-6">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/logo-primary.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="h-auto"
                    />
                </Link>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-2 font-bold text-gray-400">
                {menuItems.map((item, index) => {
                    const IconComponent = typeof SvgIcon === 'function' ? SvgIcon : item.icon;


                    //  Actif si chemin correspond exactement
                    const isExactMatch = pathname === item.href;
                    //  Actif si sous-routes uniquement pour Réservation / Finances
                    const isSubRoute =
                        (item.label === "Réservation" || item.label === "Finances") &&
                        pathname.startsWith(item.href + "/");

                    const isActive = isExactMatch || isSubRoute;

                    //  Dropdowns
                    if (item.label === "Réservation" || item.label === "Finances") {
                        const dropdownData =
                            item.label === "Réservation"
                                ? dropDownReservation
                                : dropDownFinance;

                        const isDropdownActive = dropdownData.some((d) =>
                            pathname.startsWith(d.href)
                        );

                        const isOpen = openDropdown === item.label || isDropdownActive;

                        return (
                            <div className="relative mb-1" key={index}>
                                <button
                                    onClick={() =>
                                        setOpenDropdown(isOpen ? null : item.label)
                                    }
                                    className={cn(
                                        "w-full inline-flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors justify-between",
                                        isDropdownActive || isOpen
                                            ? "bg-primary text-black font-medium"
                                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                                    )}
                                >
                                    <span className="flex items-center gap-3">
                                        <IconComponent className="w-4 h-4" />
                                            {item.label}
                                    </span>
                                    <ChevronDownIcon
                                        className={cn(
                                            "w-4 h-4 transition-transform duration-200",
                                            isOpen ? "rotate-180" : "rotate-0"
                                        )}
                                    />
                                </button>

                                {/* Sous-menu visible si ouvert */}
                                {isOpen && (
                                    <div className="mt-1 pl-6 flex flex-col space-y-1">
                                        {dropdownData.map((sub, i) => {
                                            const isSubActive = pathname === sub.href;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => router.push(sub.href)}
                                                    className={cn(
                                                        "block w-full text-left px-2 py-2 text-sm font-semibold rounded-md",
                                                        isSubActive
                                                            ? "bg-primary/90 text-black"
                                                            : "text-gray-700 hover:bg-gray-100"
                                                    )}
                                                >
                                                    {sub.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => router.push(item.href)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors relative",
                                isActive
                                    ? "bg-primary text-black font-bold"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                            )}
                        >
                            <IconComponent
                                className="w-[20px] h-[20px]"
                                {...(typeof item.icon === "string"
                                    ? { name: item.icon, size: 21 }
                                    : {})}
                            />
                            <span className="text-left flex-1">{item.label}</span>
                            {item.badge && (
                                <span className="bg-[#FD4242] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};
