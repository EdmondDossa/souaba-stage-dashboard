"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { MoreHorizontal, Phone, MailOpen, Check, Maximize2, Bed, User, Search, CalendarDays, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import FactureModal from "../../../components/FactureModal";

export default function ReservationPage() {
  //recuperation de l'id envoye a cette page
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-6">
        {/* LEFT PANEL : PROFILE */}
        <ProfileCard />

        {/* CENTER PANEL : BOOKING INFO */}
        <ReservationInfo />
      </div>

      {/* BOTTOM SECTION : HISTORY */}
      <HistorySection />  
    </div>
  );
}

/* ================= PROFILE ================= */
function ProfileCard() {
  const Profil = {
    nom: "Angus Copper",
    id: "G011-987654321",
    tel: "+1 (555) 789-1234", 
    mail: "angus.copper@example.com",
    date_naissance: "15 juin 1985",
    genre: "Mâle",
    nationalite: "Americain",
    no: "A12345678", 

  } 
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between gap-3  mb-3">
        <h3 className="text-[#0D0E0D] font-[Lato]">Profil</h3>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal color="#6E6E6E" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src="/images/jaylonprofile.png"
          width={60}
          height={60}
          className="rounded-full"
          alt="avatar"
        />
        <div>
          <h2 className="font-[Lato] text-[#0D0E0D]">{Profil.nom}</h2>
          <p className="text-xs text-[#0D0E0D]">GO11-987654321</p>
        </div>
      </div>

      <div className="mt-5 text-sm  border-t mt-4 border-[#E7E7E7] pt-4">
        <div className="flex gap-3 items-center px-3 h-10 w-64">
          <div className="bg-[#D5F6E5] p-2 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
            <Phone size={14} className="text-[#0D0E0D]"/>
          </div>      
          <p className="text-xs font-[Lato] text-[#0D0E0D]"> 
            {Profil.tel}
          </p>
        </div>
        <div className="flex gap-3 items-center px-3 h-10 w-64">
          <div className="bg-[#D5F6E5] p-2 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
            <MailOpen size={14} className="text-[#0D0E0D]"/>
          </div>
          <p className="text-xs font-[Lato] text-[#0D0E0D]"> 
            {Profil.mail}
          </p>
        </div>
      </div>

          <div className="border-t mt-4 border-[#E7E7E7] pt-4">
            <h4 className="font-[Lato] text-black text-sm mb-4">Informations personnelles</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#6E6E6E] text-xs  mb-1">Genre</p>
                <p className="font-[Lato] text-[#0D0E0D] text-xs">{Profil.genre}</p>
              </div>
              <div>
                <p className="text-[#6E6E6E] text-xs  mb-1">Nationalité</p>
                <p className="font-[Lato] text-[#0D0E0D] text-xs">{Profil.nationalite}</p>
              </div>
            </div>
          </div>
    </div>
  );
}


/* ================= RESERVATION INFO ================= */
function ReservationInfo() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null);

  const handleInvoiceClick = (reservation) => {
    setSelectedInvoiceData(reservation);
    setShowInvoice(true);
  };

  return (
    <div className="w-[140%] bg-white rounded-xl p-6 shadow-sm grid grid-cols-2 gap-10">
            <div>
                <div className="flex justify-between gap-3 mb-4">
                    <h3 className="text-[#0D0E0D] font-medium">Informations de réservation</h3>
                    <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal color="#6E6E6E" className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center w-fit gap-1 px-2 py-1 bg-[#F8AA2480] text-[#0D0E0D] text-xs rounded">
                            <Check size={12} color ="#0D0E0D"/>
                            <span>Arrivée</span>
                        </div>
                        <h2 className="text-xl text-[#0F1113] font-[Lato] mt-3">Numéro de réservation : LG-B00109</h2>
                        <p className="text-[#6E6E6E] text-xs mt-1">17 juin 2024, 9h46</p>
                    </div>
                </div>

                <div className="space-y-5 mt-5">
                    <div className="rows gap-4 flex justify-between">
                        <div className="col">
                            <span className="text-[#6E6E6E] text-xs">Prix</span>
                            <p className="text-[#0D0E0D]  text-xs">$150<span className="text-[#6E6E6E] text-xs">/night</span></p>
                        </div>
                    </div>
                    <div className="rows gap-4 flex justify-between">
                        <Field label="Invités" value="2 adultes" />
                        <Field label="Mode de paiement" value="Cash" />
                        <Field label="Réservation" value="En présentiel" />
                    </div>
                    <div className="rows gap-2 flex justify-between">
                        <div className="col">
                            <span className="text-[#6E6E6E] text-xs ">Check In</span>
                            <p className="text-[#0D0E0D]  text-xs">June 19, 2024</p>
                            <p className="text-[#6E6E6E]  text-xs">1.45 PM</p>
                        </div>
                        <div className="col">
                            <span className="text-[#6E6E6E] text-xs ">Check Out</span>
                            <p className="text-[#0D0E0D]  text-xs">June 22, 2024</p>
                            <p className="text-[#6E6E6E]  text-xs">11.45 AM</p>
                        </div>
                        <Field label="Durée" value="3 nuits" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm border-t mt-4 border-[#E7E7E7] pt-4">
                    <div>
                        <h3 className="font-[Lato] text-xs text-[#6E6E6E] mb-2">Commodités</h3>
                        <ul className="space-y-1 text-gray-600">
                            <li>
                                <div className="flex items-center gap-2">
                                    <Check size={12} color="#CCD97E"/>
                                    <span className="text-xs  text-[#0D0E0D]"> Petit-déjeuner gratuit</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <Check size={12} color="#CCD97E"/>
                                    <span className="text-xs  text-[#0D0E0D]">Wi-Fi gratuit</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <Check size={12} color="#CCD97E"/>
                                    <span className="text-xs  text-[#0D0E0D]">Accès à la salle de sport et à la piscine</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-5 py-2 text-sm font-medium rounded-lg bg-[#29B06F] text-white"
                            onClick={() => setShowInvoice(true)}
                    >
                        Payer
                    </button>
                    {showInvoice && (
                        <FactureModal show={showInvoice} onClose={() => setShowInvoice(false)} data={selectedInvoiceData} />
                    )}
                    <button className="px-5 py-2 text-sm font-medium rounded-lg border-[#FFEEEE] bg-[#FFEEEE] text-[#0D0E0D]">
                        Annuler la réservation
                    </button>
                </div>
            </div>
            <div className="flex justify-end col-end">
                {/* ================= ROOM DETAILS ================= */}
                <div className="h-full w-fit bg-[#F8F8F8] rounded-xl p-4 shadow-sm justify-end">
                    <div className="flex justify-between">
                        <p className="text-[#0D0E0D] text-sm">
                            Informations sur la chambre
                        </p>
                        <button className="text-[#6E6E6E] text-xs text-medium">
                            Voir les détails
                        </button>
                    </div>
                    <div className="flex justify-center m-4">
                      <Image src="/images/profil/profil_chambre.jpg" width={500} height={163} alt="room" className="rounded-lg" />
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                        <div className="flex justify-center items-center gap-1">
                            <Maximize2 color="#A3A3A3" size={12} />
                            <span className="text-[#0D0E0D] text-xs font-[Lato]">35 m²</span>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <Bed color="#A3A3A3" size={12} />
                            <span className="text-[#0D0E0D] text-xs font-[Lato]">Très grand lit</span>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <User color="#A3A3A3" size={12} />
                            <span className="text-[#0D0E0D] text-xs font-[Lato]">2 invités</span>
                        </div>
                    </div>
                    <div className="border-t mt-4 border-[#E7E7E7] pt-4 flex justify-between">
                        <p className="text-[#0D0E0D] text-sm font-[Lato]">
                            Prix total
                        </p>
                        <p className="text-[#0D0E0D] text-sm font-[Lato]">
                            $535.50
                        </p>

                    </div>
                </div>
    </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="col">
      <span className="text-[#6E6E6E]  text-xs">{label}</span>
      <p className="text-[#0D0E0D]  text-xs">{value}</p>
    </div>
  );
}




function PriceRow({ label, value, bold }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? "font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}

/* ================= HISTORY SECTION ================= */
function HistorySection() {
const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "January 1, 2028",
    end: "December 31, 2028"
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const res = [
    {
      id: "LG-B00109",
      name: "Angus Copper",
      date: "June 09, 2028",
      heureDate:"9.08 AM",
      checkIn: "June 19, 2028",
      heureIn: "9:08 AM", 
      checkOut: "June 21, 2028",
      heureOut: "1:45 PM",
      guests: "2 Guests",
      img: "/images/profil/MiniChan1.jpg",
    },
    {
      id: "LG-B00085",
      name: "John Doe",
      date: "March 20, 2028",
      heureDate:"9.08 AM",
      checkIn: "March 25, 2028",
      heureIn: "1:45 PM",
      checkOut: "March 30, 2028",
      heureOut: "11:45 AM",
      guests: "1 Guest",
      img: "/images/profil/MiniChan2.jpg",
    },
  ];

  // Fonction pour convertir une date string en objet Date
  const parseDate = (dateStr) => {
    return new Date(dateStr);
  };

  // Fonction de filtrage et recherche
  const filteredReservations = res.filter((reservation) => {
    // Filtre par recherche (id)
    const matchesSearch = 
      searchQuery === "" ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre par date
    const checkInDate = parseDate(reservation.checkIn);
    const checkOutDate = parseDate(reservation.checkOut);
    const startDate = parseDate(dateRange.start);
    const endDate = parseDate(dateRange.end);
    
    // La réservation doit avoir un chevauchement avec la période sélectionnée
    const matchesDate = 
      (checkInDate >= startDate && checkInDate <= endDate) ||
      (checkOutDate >= startDate && checkOutDate <= endDate) ||
      (checkInDate <= startDate && checkOutDate >= endDate);
    
    return matchesSearch && matchesDate;
  });

  // Fonction pour formater la date d'affichage
  const formatDateDisplay = (dateStr) => {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="mt-10 bg-white rounded-xl p-6 border-none shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Historique des réservations</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#F8F8F8] border-gray-100 rounded-md px-3 h-10 py-1.5 w-64">
            <Search size={16} className="text-[#6E6E6E] mr-2"/>
            <input
              type="text"
              placeholder="Rechercher un invité, un statut, etc."
              className="w-full text-xs outline-none text-[#0D0E0D] bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Date Range Picker */}
          <div className="relative"> 
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-xs text-[#0D0E0D] font-medium bg-[#F8F8F8] border-[#F8F8F8]"
            >
              <CalendarDays size={16} />
              {formatDateDisplay(dateRange.start)} - {formatDateDisplay(dateRange.end)}
              <ChevronDown/>
            </button>
            
            {showDatePicker && (
              <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 w-80 overflow-y-auto max-h-96">
                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-2">Date de début</label>
                  <input
                    type="date"
                    value={new Date(dateRange.start).toISOString().split('T')[0]}
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      setDateRange({
                        ...dateRange,
                        start: newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-2 focus:ring-[#F8AA24]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-2">Date de fin</label>
                  <input
                    type="date"
                    value={new Date(dateRange.end).toISOString().split('T')[0]}
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      setDateRange({
                        ...dateRange,
                        end: newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs outline-none focus:ring-2 focus:ring-[#F8AA24]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="flex-1 px-3 py-2 bg-[#F8AA24] text-white rounded-md text-xs font-medium hover:bg-[#e09a1a]"
                  >
                    Appliquer
                  </button>
                  <button
                    onClick={() => {
                      setDateRange({
                        start: "January 1, 2028",
                        end: "December 31, 2028"
                      });
                      setShowDatePicker(false);
                    }}
                    className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center">
          <thead className="bg-[#F5FDF9] border-b text-[#6E6E6E] text-center">
            <tr className="border-b border-gray-100 text-xs">
              <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className="flex justify-center items-center">
                  Image
                  <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>
              </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className="flex justify-center items-center">
                  ID de réservation
                  <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>
              </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className="flex justify-center items-center">
                  Date de réservation
                  <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>
              </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className="flex justify-center items-center">
                  Check-In
                  <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>
              </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className="flex justify-center items-center">
                  Check-Out
                  <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>
              </th>
              <th className="p-3 font-medium bg-[#F5FDF9]">
                <div className="flex justify-center items-center">
                  Invités
                  <ChevronUpDownIcon className="text-[#6E6E6E] h-5 w-5" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res, index) => (
                <tr key={res.id} className="border-b border-gray-100 py-10">
                  <td className="py-3">
                    <div className="flex justify-center">
                      <Image src={res.img} width={70} height={50} alt="Image miniature" className="rounded-md"/>
                    </div>
                  </td>
                  <td className="p-3 text-[#0D0E0D] text-xs font-bold items-center">
                    {res.id}
                  </td>
                  <td className="p-3 text-[#0D0E0D] text-xs font-bold items-center">
                    {res.date}
                    <span className="text-[#6E6E6E] text-xs grid">{res.heureDate}</span>
                  </td>
                  <td className="p-3 text-[#0D0E0D] text-xs font-bold items-center grid">
                    {res.checkIn}
                    <span className="text-[#6E6E6E] text-xs">{res.heureIn}</span>
                  </td>
                  <td className="p-3 text-[#0D0E0D] text-xs font-bold items-center">
                    {res.checkOut}
                    <span className="text-[#6E6E6E] text-xs grid">{res.heureOut}</span>
                  </td>
                  <td className="p-3 text-[#0D0E0D] text-xs font-bold">
                    {res.guests}
                  </td>
                </tr>
              ))
            }
            {filteredReservations.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500 text-sm">
                  Aucune réservation trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
