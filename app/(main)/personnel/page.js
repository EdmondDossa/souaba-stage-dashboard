"use client";

import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, ChevronLeft, Filter, SlidersHorizontal} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ModalAdd from "./ModalAjout";

export default function PersonnelsPage() {
const [roleFilter, setRoleFilter] = useState("Tous les rôles");
const [isOpen, setIsOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");

const personnels = [
{
    name: "Bebe W. Cullen",
    role: "Admin",
    contact: "+1 (555) 234-5678",
    email: "bebe.cullen@example.com",
    color: "bg-[#8EA6F6]",
    pathImg: "/images/personnel/boy.png"
},
{
    name: "Alwar King",
    role: "Réceptionniste",
    contact: "+1 (555) 345-6789",
    email: "alwar.king@example.com",
    color: "bg-[#8EA6F6]",
    pathImg: "/images/personnel/boy.png"
},
{
    name: "Sarah May",
    role: "Réceptionniste",
    contact: "+1 (555) 456-7890",
    email: "sarah.may@example.com",
    color: "bg-[#F38EF6]",
    pathImg: "/images/personnel/girl.png"
},
{
    name: "Gavin Timberbolt",
    role: "Admin",
    contact: "+1 (555) 567-8901",
    email: "gavin.timberbolt@example.com",
    color: "bg-[#8EA6F6]",
    pathImg: "/images/personnel/boy.png"
},
{
    name: "Francesca Illing",
    role: "Responsable Ménage",
    contact: "+1 (555) 678-9012",
    email: "francesca.illing@example.com",
    color: "bg-[#F38EF6]",
    pathImg: "/images/personnel/girl.png"
},
{
    name: "Joan Laster",
    role: "Réceptionniste",
    contact: "+1 (555) 789-0123",
    email: "joan.laster@example.com",
    color: "bg-[#8EA6F6]",
    pathImg: "/images/personnel/boy.png"
},
{
    name: "Odena Berg",
    role: "Réceptionniste",
    contact: "+1 (555) 890-1234",
    email: "odena.berg@example.com",
    color: "bg-[#F38EF6]",
    pathImg: "/images/personnel/girl.png"

},
{
    name: "Kevin Nicolas",
    role: "Responsable Ménage",
    contact: "+1 (555) 901-2345",
    email: "vinnicolas@example.com",
    color: "bg-[#8EA6F6]",
    pathImg: "/images/personnel/boy.png"

},
{
    name: "Beatrice White",
    role: "Admin",
    contact: "+1 (555) 012-3456",
    email: "beatrice.white@example.com",
    color: "bg-[#F38EF6]",
    pathImg: "/images/personnel/girl.png"

},
{
    name: "Vincent Snow",
    role: "Réceptionniste",
    contact: "+1 (555) 123-4567",
    email: "vincent.snow@example.com",
    color: "bg-[#8EA6F6]",
    pathImg: "/images/personnel/boy.png"

},
{
    name: "Rafael Bartoletti",
    role: "Responsable Ménage",
    contact: "+1 (555) 896-1019",
    email: "rafael98@example.com",
    color: "bg-[#8EA6F6]",
    pathImg: "/images/personnel/boy.png"


},
];

// Fonction de filtrage combinée
const filteredPersonnels = personnels.filter((personnel) => {
// Filtre par rôle
const matchesRole = roleFilter === "Tous les rôles" || personnel.role === roleFilter;

// Filtre par recherche (nom, email, contact)
const matchesSearch = 
    searchQuery === "" ||
    personnel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    personnel.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    personnel.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    personnel.role.toLowerCase().includes(searchQuery.toLowerCase());

return matchesRole && matchesSearch;
});

return (
<div className="min-h-screen bg-[#FFFFFF] px-8 py-6">
    {/* Header actions */}
    <div className="flex items-center justify-between mb-6">
    <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="border-[#F8F8F8] bg-[#F8F8F8] border font-medium rounded-lg px-3 py-2 text-sm text-[#0D0E0D] focus:outline-none"
    >
        <option className={"bg-background"}>Tous les rôles</option>
        <option className={"bg-background"}>Admin</option>
        <option className={"bg-background"}>Réceptionniste</option>
        <option className={"bg-background"}>Responsable Ménage</option>
    </select>

    <div className="flex items-center gap-3">
        <div className="relative bg-[#F8F8F8] rounded-lg">
        <Search color="#6E6E6E" className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
            type="text"
            placeholder="Rechercher par nom & prénom..."
            className="pl-9 pr-3 py-2 bg-transparent border-none rounded-lg text-sm text-[#0D0E0D] focus:outline-none w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <button 
        className="bg-[#F8F8F8] rounded-lg p-2"
        onClick={() => {
            // Fonction pour recherche avancée si besoin
            console.log("Recherche avancée");
        }}
        >
        <Search color="#6E6E6E" className="w-4 h-4 text-gray-500" />
        </button>
        <button className="bg-[#F8F8F8] rounded-lg p-2">
        <SlidersHorizontal color="#6E6E6E" className="w-4 h-4 text-gray-500" />
        </button>
        <button 
        className="bg-[#F8AA24] text-[#0D0E0D] px-4 py-2 rounded-lg text-sm font-medium" 
        onClick={() => setIsOpen(true)}
        >
        Ajouter un personnel
        </button>
        {isOpen && (
        <ModalAdd isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
    </div>
    </div>

    {/* Table */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-none">
    <table className="w-full text-sm text-center">
        <thead className="bg-[#F5FDF9] border-b text-[#6E6E6E] text-center">
        <tr className="border-b border-gray-100 text-xs">
            <th className="p-3 font-medium bg-[#F5FDF9]">
            <div className={"flex justify-start ml-8 "}>
                Nom & Prénom
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
            <div className={"flex justify-center"}>
                Rôle
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
            <div className={"flex justify-center"}>
                Contact
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
            <div className={"flex justify-center"}>
                Email
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
            <th className="p-3 font-medium bg-[#F5FDF9]">
            <div className={"flex justify-center"}>
                Action
                <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
            </div>
            </th>
        </tr>
        </thead>
        <tbody>
        {filteredPersonnels.length > 0 ? (
            filteredPersonnels.map((p, i) => (
            <tr
                key={i}
                className="border-b border-gray-100 py-10 hover:bg-gray-50 transition"
            >
                <td className="px-6 py-4 flex text-[#1E1E1E] font-semibold items-center gap-3">
                <div
                    className={`${p.color} w-15 h-15 rounded-full flex items-center justify-center text-white font-semibold`}
                >
                    <img src={p.pathImg} alt="image_personnel" height="50" width="50" className="relative"/>
                </div>
                {p.name}
                </td>
                <td className="px-6 py-4 text-[#1E1E1E] text-xs font-semibold">{p.role}</td>
                <td className="px-6 py-4 text-[#1E1E1E] text-xs font-semibold">{p.contact}</td>
                <td className="px-6 py-4 text-[#1E1E1E] text-xs font-semibold">{p.email}</td>
                <td className="p-3 text-right flex justify-center gap-2">   
                <button className="p-1.5 rounded-md bg-[#F8F8F8] hover:bg-gray-200 transition">
                    <Eye size={16} color="#6E6E6E"/>
                </button>
                <button className="p-1.5 rounded-md bg-[#F8F8F8] hover:bg-gray-200 transition">
                    <Edit size={16} color="#6E6E6E"/>
                </button>
                </td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan="5" className="p-8 text-center text-gray-500 text-sm">
                Aucun personnel trouvé
            </td>
            </tr>
        )}
        </tbody>
    </table>
    </div>

    {/* Pagination */}
    <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
    <span className="text-[#6E6E6E] text-xs">
        Showing 1-{filteredPersonnels.length} of {personnels.length}
    </span>
    <div className="flex gap-1 text-black justify-end">
        <ChevronLeft className="w-6 h-6 rounded mt-1 bg-[#F8F8F8] justify-center cursor-pointer hover:bg-gray-200 transition" />
        {[1, 2, 3].map((num, i) => (
        <button
            key={i}
            className={`px-3 py-1 m-1 text-xs rounded transition ${
            num === 1
                ? "bg-[#F8AA24] text-[#FFFFFF]"
                : "bg-[#F8F8F8] text-gray-700 hover:bg-gray-200"
            }`} 
        >
            {num}
        </button>
        ))}
        <ChevronRight className="w-6 h-6 rounded mt-1 bg-[#F8F8F8] justify-center cursor-pointer hover:bg-gray-200 transition" />
    </div>
    </div>
</div>
);
}