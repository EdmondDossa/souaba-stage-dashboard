"use client";
import { useState } from "react";
import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, Filter, ChevronLeft} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Download, Wallet, DollarSign, CircleDollarSign } from "lucide-react";
import Card from "../../components/Card";
import FactureModal from "../../components/FactureModal";

export default function ReservationList() {

    const [statusFilter, setStatusFilter] = useState("Tous les statuts");
    const [showInvoice, setShowInvoice] = useState(false);  
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1); //Page actuelle
    const itemsPerPage = 10; //Nombre d'éléments par page
    const [categoryFilter, setCategoryFilter] = useState("Toutes les categories"); 
    
    // Gestion du changement de filtre de statut
    const handleStatusChange = (e) => {
       setStatusFilter(e.target.value);
    };

    //Gestion du changement de filtre de catégorie
    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value); 
    };

    const reservations = [
        { id: "LG-B00108", category: "Luxe", price: "10 000", commission: "20%", reverssement: "8 000", rembourssement: "0", status: "Succès" },
        { id: "LG-B00107", category: "Standard", price: "10 000", commission: "20%", reverssement: "0", rembourssement: "0", status: "En attente" },
        { id: "LG-B00109", category: "Suite", price: "10 000", commission: "20%", reverssement: "0", rembourssement: "0", status: "Refuser" },
        { id: "LG-B00110", category: "Supérieure", price: "10 000", commission: "20%", reverssement: "0", rembourssement: "0", status: "En attente" },
        { id: "LG-B00111", category: "Luxe", price: "50 000", commission: "20%", reverssement: "0", rembourssement: "50 000", status: "Succès" },
        { id: "LG-B00112", category: "Standard", price: "30 000", commission: "20%", reverssement: "24 000", rembourssement: "0", status: "Succès" },
        { id: "LG-B00113", category: "Supérieure", price: "20 000", commission: "20%", reverssement: "16 000", rembourssement: "0", status: "Succès" },
        { id: "LG-B00114", category: "Suite", price: "30 000", commission: "20%", reverssement: "24 000", rembourssement: "0", status: "Succès" },
        { id: "LG-B00115", category: "Luxe", price: "40 000", commission: "20%", reverssement: "32 000", rembourssement: "0", status: "Succès" },
        { id: "LG-B00116", category: "Supérieure", price: "50 000", commission: "20%", reverssement: "40 000", rembourssement: "0", status: "En attente" },
    ];

    const getStatusColor = (status) =>
        status === "En attente"
        ? "bg-[#F8AA24] text-[#0D0E0D] border-[#F8AA24]"
        : status === "Succès"
        ? "bg-[#D5F6E5] text-[#0D0E0D] border-[#D5F6E5]"
        : status === "Refuser"
        ? "bg-[#C94C4C] text-[#FFFFFF] border-[#C94C4C]"
        : "bg-[#F8AA24] text-[#0D0E0D] border-[#F8AA24]";

    // Fonction de filtrage et recherche
    const filteredReservations = reservations.filter((res) => {
        // Filtre par statut
        const matchesStatus = statusFilter === "Tous les statuts" || res.status === statusFilter;
        //Filtre par catégorie
        const matchesCategory = categoryFilter === "Toutes les categories" || res.category === categoryFilter;

        // Filtre par recherche (id, category, price, commission, reverssement, rembourssement, status)
        const matchesSearch = 
          searchQuery === "" ||
          res.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.commission.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.reverssement.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.rembourssement.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.status.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesStatus && matchesSearch && matchesCategory;
    });

     //Calcul de la pagination
    const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReservations = filteredReservations.slice(startIndex, endIndex);

    //Fonctions de navigation
    const goToNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //Générer les numéros de pages à afficher
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
        // Si 5 pages ou moins, afficher toutes
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        } else {
        // Sinon, afficher les pages avec "..."
        if (currentPage <= 3) {
            pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
        }
        return pages;
    };


    return (
        <>
        {/*cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card
                    title="Revenus Total"
                    value="$15,650"
                    trend={3.56}
                    icon={Wallet}
                    bgColor="bg-[#FFFFFF]"
                    bgColorTrend="bg-[#E7F68E]"
                    bgColorIcon="bg-[#D5F6E5]"
                />

                <Card
                    title="Commisions"
                    value="$45,650"
                    trend={1.25}
                    icon={CircleDollarSign}
                    bgColor="bg-[#FFFFFF]"
                    bgColorTrend="bg-[#FFC7C7]"
                    bgColorIcon="bg-[#D5F6E5]"
                />

                <Card
                    title="Reversements"
                    value="$45,650"
                    trend={1.25}
                    icon={CircleDollarSign}
                    bgColor="bg-[#FFFFFF]"
                    bgColorTrend="bg-[#E7F68E]"
                    bgColorIcon="bg-[#D5F6E5]"
                />
        </div>

        <div className="flex-1 bg-white border-white p-7 rounded min-h-screen mt-3">
          {/* Header Filters */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-[#0D0E0D]">Transactions</h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#F8F8F8] border border-gray-200 rounded-md py-1.5 w-64">
                    <Search size={16} color="#6E6E6E" className="mr-2 ml-2" />
                    <input
                        type="text"
                        placeholder="Search expense"
                        className="w-full text-xs text-[#A3A3A3] outline-none bg-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-black font-medium bg-[#F8F8F8] border-[#F8F8F8]">
                <Filter color="#0D0E0D" className="h-3 w-3"/>
                <select 
                  value={categoryFilter} 
                  onChange={handleCategoryChange} 
                  className="outline-none bg-transparent text-xs"
                >
                  <option value="Toutes les categories">Toutes les catégories</option>
                  <option value="Luxe">Luxe</option>
                  <option value="Standard">Standard</option>
                  <option value="Supérieure">Supérieure</option>
                  <option value="Suite">Suite</option>
                </select>
            </button>

            <button className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-black font-medium bg-[#F8F8F8] border-[#F8F8F8]">
                <Filter color="#0D0E0D" className="h-3 w-3"/>
                <select 
                  value={statusFilter} 
                  onChange={handleStatusChange} 
                  className="outline-none bg-transparent text-xs"
                >
                  <option value="Tous les statuts">Tous les statuts</option>
                  <option value="Succès">Succès</option>
                  <option value="En attente">En attente</option>
                  <option value="Refuser">Refuser</option>
                </select>
            </button>
            </div>
        </div>

          {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto border-none">
            <table className="w-full text-sm text-center">
            <thead className="bg-[#F5FDF9] border-b text-[#6E6E6E] text-center">
                <tr className="border-b border-gray-100">
                    <th className="p-3 font-medium">
                        <div className={"flex justify-center"}>
                            Numéro de réservation
                            <ChevronUpDownIcon color="#6E6E6E"className="h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium">
                        <div className={"flex justify-center"}>
                            Catégorie
                            <ChevronUpDownIcon color="#6E6E6E"className="h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium">
                        <div className={"flex justify-center"}>
                            Prix
                            <ChevronUpDownIcon color="#6E6E6E"className="h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium">
                        <div className={"flex justify-center"}>
                            Commissions
                            <ChevronUpDownIcon color="#6E6E6E"className="h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium">
                        <div className={"flex justify-center"}>
                            Reverssement
                            <ChevronUpDownIcon color="#6E6E6E"className="h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium">
                        <div className={"flex justify-center"}>
                            Rembourssement
                            <ChevronUpDownIcon color="#6E6E6E"className="h-5 w-5" />
                        </div>
                    </th>
                    <th className="p-3 font-medium">
                        <div className={"flex justify-center"}>
                            Statuts
                            <ChevronUpDownIcon color="#6E6E6E"className="h-5 w-5" />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                currentReservations.length > 0 ? (
                    currentReservations.map((r, i) => (
                <tr key={i} className="border-b bg-[#FFFFFF] border-gray-100 py-10">
                    <td className="p-3 text-[#0D0E0D] text-xs font-bold">{r.id}</td>
                    <td className=" text-[#0D0E0D] text-xs font-bold">{r.category}</td>
                    <td className=" text-[#0D0E0D] text-xs font-bold">{r.price}</td>
                    <td className=" text-[#0D0E0D] text-xs font-bold">{r.commission}</td>
                    <td className="p-6 text-[#0D0E0D] text-xs font-bold">{r.reverssement}</td>
                    <td className="p-6 text-[#0D0E0D] text-xs font-bold">{r.rembourssement}</td>
                    <td className="p-6 text-[#0D0E0D] text-xs font-bold">
                    <span className={`px-2 py-0.5 text-xs rounded-md border ${getStatusColor(r.status)}`}>{r.status}</span>
                    </td>
                </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan="7" className="p-8 text-center text-sm text-gray-500">
                            Aucune transaction trouvée.
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 text-l text-gray-500 bg-[#FFFFFF]">
            <span className="text-[#6E6E6E] text-xs">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredReservations.length)} of {filteredReservations.length}
            </span>
            <div className="flex gap-1 text-black justify-end items-center">
                <button className="flex items-center bg-[#F8AA24] text-[#0D0E0D] text-xs px-2.5 py-2 rounded-md">
                    <Download size={14} className="mr-2" /> Download
                </button>
                {/* Bouton précédent */}
                <button 
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                >
                <ChevronLeft className="w-6 h-6 rounded bg-[#F8F8F8]" />
                </button>

                {/* Numéros de pages */}
                {getPageNumbers().map((num, i) => (
                <button
                    key={i}
                    onClick={() => typeof num === 'number' && goToPage(num)}
                    disabled={num === "..."}
                    className={`px-3 py-1 m-1 text-xs rounded ${
                    num === currentPage
                        ? "bg-[#F8AA24] text-[#FFFFFF]"
                        : num === "..."
                        ? "bg-transparent text-[#000000] cursor-default"
                        : "bg-[#F8F8F8] text-[#000000] hover:bg-gray-200"
                    }`} 
                >
                    {num}
                </button>
                ))}

                {/* Bouton suivant */}
                <button 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                >
                <ChevronRight className="w-6 h-6 rounded bg-[#F8F8F8]" />
                </button>           
            </div>
            </div>
        </div>
    </>
    );
}