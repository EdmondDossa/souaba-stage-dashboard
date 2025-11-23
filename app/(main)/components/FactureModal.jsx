"use client";
import { X } from "lucide-react";
import { useRef } from "react";

export default function FactureModal({ show, onClose, data }) {
    const factureRef = useRef(null);

    if (!show) return null;

    // Fonction pour fermer la modale si on clique sur l'arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    //Fonction pour imprimer la facture en PDF
    const handlePrint = () => {
        const printContent = factureRef.current;
        
        // Créer une nouvelle fenêtre avec le style
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Facture</title>');
        printWindow.document.write(`
            <style>
                @media print {
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        color: #000;
                    }
                    .facture-container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 24px;
                        border: 1px solid #e5e7eb;
                    }
                    .logo-container {
                        text-align: right;
                        margin-bottom: 32px;
                    }
                    .logo {
                        height: 40px;
                        display: inline-block;
                    }
                    .header-section {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 24px;
                        font-size: 12px;
                    }
                    .title-section {
                        text-align: center;
                        margin-bottom: 16px;
                        font-size: 12px;
                        font-weight: 600;
                    }
                    .details-section {
                        font-size: 14px;
                        margin-bottom: 16px;
                    }
                    .detail-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 12px;
                    }
                    .detail-label {
                        color: #6E6E6E;
                    }
                    .detail-value {
                        font-weight: 500;
                    }
                    .amount-row {
                        text-align: right;
                        margin-top: 16px;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .thank-you {
                        font-size: 12px;
                        font-weight: 600;
                        margin-top: 24px;
                        text-align: left;
                        align-items: center;
                    }
                }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        // Attendre que les images soient chargées
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
    };

    return (
        <div className="flex gap-3 fixed rounded-lg inset-0 z-50 flex items-center justify-center bg-[#00000033]" onClick={handleBackdropClick}>
            <div className="bg-[#FFFFFF] rounded shadow-2xl max-w-md w-full relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-[#FFFFFF] z-50"
                >
                    <X size={22} color="white" className="bg-red-500 rounded-2xl p-1" />
                </button>

                <div className="p-6">
                    <h2 className="text-center text-[#000000] text-lg font-inter pb-4">Facture</h2>

                    {/* Conteneur de la facture pour l'impression */}
                    <div ref={factureRef}>
                        <div className="facture-container">
                            {/* Carte facture */}
                            <div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 overflow-hidden w-[100%] h-auto">
                                <div className="relative p-6">
                                    {/* Bande décorative */}
                                    <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full bg-gradient-to-b from-orange-400 to-orange-100"></div>
                                    <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-gradient-to-b from-orange-400 to-orange-100"></div>

                                    {/* Logo */}
                                    <div className="logo-container flex justify-end mb-8">
                                        <div className="relative">
                                            <img
                                                src="/images/logo-primary.png"
                                                alt="Souaba"
                                                className="logo h-10 mx-auto"
                                            />
                                        </div>
                                    </div>

                                    {/* Header facture */}
                                    <div className="header-section flex justify-between mb-6 text-sm">
                                        <div>
                                            <p className="text-[#000000] font-medium text-xs mb-1">
                                                FACTURE N° : <span className="text-[#000000] font-semibold">00001</span>
                                            </p>
                                            <p className="font-bold text-[#000000] text-base mt-3">John BILL</p>
                                            <p className="text-[#000000] text-xs">+225 15 47 58 98</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-[#000000] text-xs">CÔTE D'IVOIRE, ABIDJAN</p>
                                            <p className="text-[#6E6E6E] text-xs italic">hotel@gmail.com</p>
                                        </div>
                                    </div>

                                    {/* Résumé */}
                                    <div className="text-center mb-4 relative z-10">
                                        <div className="title-section bg-[#F8AA24] text-[#FFFFFF] text-xs font-semibold w-[60%] px-4 py-1 rounded-full inline-block">
                                            Résumé de la réservation
                                        </div>
                                    </div>

                                    <div className="details-section text-sm space-y-3 relative z-10">
                                        <div className="detail-row flex justify-between">
                                            <span className="detail-label text-[#6E6E6E]">Date de la réservation</span>
                                            <span className="detail-value font-medium">24 août 2023 10h00</span>
                                        </div>
                                        <div className="detail-row flex justify-between">
                                            <span className="detail-label text-[#6E6E6E]">Date d'arrivée</span>
                                            <span className="detail-value font-medium">4 octobre 2023</span>
                                        </div>
                                        <div className="detail-row flex justify-between">
                                            <span className="detail-label text-[#6E6E6E]">Date de départ</span>
                                            <span className="detail-value font-medium">7 octobre 2023</span>
                                        </div>
                                        <div className="detail-row flex justify-between">
                                            <span className="detail-label text-[#6E6E6E]">Nombre de nuits</span>
                                            <span className="detail-value font-medium">3</span>
                                        </div>
                                        <div className="detail-row flex justify-between">
                                            <span className="detail-label text-[#6E6E6E]">Nombre d'invités</span>
                                            <span className="detail-value font-medium">5 personnes</span>
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <span className="amount-row bg-[#F8AA24] text-[#FFFFFF] text-sm font-semibold px-4 py-1.5 rounded-full">
                                                Montant 900.000 FCFA
                                            </span>
                                        </div>
                                    </div>

                                    <p className="thank-you text-xs text-center flex justify-start font-semibold text-[#000000] mt-6 relative z-10">
                                        Merci de nous faire confiance !
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button 
                            className="bg-[#D70A0A] text-[#FFFFFF] px-4 py-2 rounded-md text-sm hover:bg-[#b00808] transition-colors"
                            onClick={handlePrint}
                        >
                            Imprimer
                        </button>
                        <button className="bg-[#29B06F] text-[#FFFFFF] px-4 py-2 rounded-md text-sm hover:bg-[#248F5E] transition-colors">
                            Envoyer via Email au client
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}