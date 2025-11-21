'use client';
import { useState, useRef, useEffect } from 'react';
import ImageGallery from '@/app/(main)/appartement-details/components/ImageGallery';
import SecurityModal from './SecurityModal';
import AmenitiesModal from './AmenitiesModal';
import EditCategoryModal from './EditCategorieModal';
import AddCategoryModal from './AddCategorieModal';
import DescriptionModal from './DescriptionModal';
import getAxiosInstance from '@/lib/request';
import { useHotelWithCategories } from '@/lib/api-routes';


import { CheckIcon, Search, Edit } from "lucide-react";
import { SvgIcon } from "@/components/ui/common";
import { useRouter } from 'next/navigation';

const amenityIcons = {
    'Wi-Fi haut débit': 'wifiRoom',
    'Coffre-fort dans la chambre': 'safeRoom',
    'Télévision à écran plat': 'tvRoom',
    'Climatisation': 'acRoom',
    'Mini-réfrigérateur': 'Snowflake',
    'cafetière/théière': 'CoffeeRoom',
};

export default function RoomsMainPage({ hotelData: initialHotelData, categories: initialCategories }) {
    const { refetch } = useHotelWithCategories();
    const [hotelData, setHotelData] = useState(initialHotelData);
    const [selectedModal, setSelectedModal] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Populaire');
    const [typeFilter, setTypeFilter] = useState('Tous types');
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryToAdd, setCategoryToAdd] = useState(null);
    const [categories, setCategories] = useState(initialCategories);
    const [showDescriptionHover, setShowDescriptionHover] = useState(false);

    // Fonction pour rafraîchir les données
    const handleRefresh = async () => {
        if (refetch) {
            await refetch();
        }
    };

    // Synchroniser avec les props
    useEffect(() => {
        setHotelData(initialHotelData);
    }, [initialHotelData]);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);


    // Filtres + tri
    let filteredCategories = categories.filter(cat => {
        const query = searchQuery.toLowerCase();
        return (
            cat.name.toLowerCase().includes(query) ||
            cat.type.toLowerCase().includes(query) ||
            cat.description.toLowerCase().includes(query) ||
            cat.area.toLowerCase().includes(query) ||
            cat.guests.toLowerCase().includes(query)
        );
    });

    if (typeFilter !== 'Tous types') {
        filteredCategories = filteredCategories.filter(cat => cat.type === typeFilter);
    }

    if (sortBy === 'Prix croissant') {
        filteredCategories = filteredCategories.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Prix décroissant') {
        filteredCategories = filteredCategories.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Populaire') {
        filteredCategories = filteredCategories.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    const openGallery = (category) => {
        setSelectedCategory(category);
        setSelectedModal('gallery');
    };

    const openEditModal = (category) => {
        setCategoryToEdit(category);
        setSelectedModal('editCategory');
    };

    const openAddModal = (category) => {
        setCategoryToAdd(category);
        setSelectedModal('addCategory');
    };

    const handleSaveCategory = async (id, updatedData) => {
        try {
            // TODO: Appeler l'API pour mettre à jour la catégorie
            // const axios = getAxiosInstance();
            // await axios.put(`/hotel-room-categories/${id}`, updatedData);
            
            setCategories(prev =>
                prev.map(cat => (cat.id === id ? { ...cat, ...updatedData } : cat))
            );
            setSelectedModal(null);
        } catch (err) {
            console.error('Erreur lors de la sauvegarde de la catégorie:', err);
            alert('Erreur lors de la sauvegarde');
        }
    };

    const handleSaveHotelData = async (field, data) => {
        try {
            if (!hotelData.hotel_id) {
                console.error('Aucun hotel_id disponible');
                return;
            }

            // TODO: Appeler l'API pour mettre à jour l'hôtel
            // const axios = getAxiosInstance();
            // await axios.put(`/hotels/${hotelData.hotel_id}`, { [field]: data });
            
            setHotelData(prev => ({
                ...prev,
                [field]: data
            }));
            setSelectedModal(null);
        } catch (err) {
            console.error('Erreur lors de la sauvegarde:', err);
            alert('Erreur lors de la sauvegarde');
        }
    };

    const router = useRouter();

    return (
        <div className="p-6 bg-white rounded-2xl">
            <div className="flex gap-6">
                {/* Colonne gauche - Info hôtel */}
                <div className="w-1/3 bg-gray-100 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Information sur l'hôtel</h2>
                        <button
                            onClick={() => openAddModal(hotelData.categories)}
                            className="bg-primary hover:bg-primary font-bold text-black px-4 py-2 rounded-lg text-sm">
                            Ajouter une catégorie
                        </button>
                    </div>

                    <h1 className="text-2xl font-bold mb-2">{hotelData.name}</h1>
                    <p className="text-gray-600 text-sm mb-4">
                        Nombre de chambre total: <span className="font-semibold">{hotelData.totalRooms} Chambres</span>
                    </p>

                    {/* Section image principale + galerie */}
                    <div className="flex gap-4 mb-5 justify-between">
                        <div className="w-full">
                            <img
                                src={hotelData.mainImage}
                                alt="Hotel room"
                                className="w-full h-80 object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col justify-between">
                            <div className="grid grid-cols-1 gap-3">
                                {hotelData.galleryImages.slice(0, 4).map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Gallery ${idx + 1}`}
                                        className="h-18 object-cover rounded cursor-pointer hover:opacity-80 transition"
                                        onClick={() => openGallery(hotelData)}
                                    />
                                ))}
                            </div>
                            <button
                                className="bg-primary hover:bg-orange-600 text-black py-2 rounded-lg text-sm h-15 transition"
                                onClick={() => openGallery(hotelData)}
                            >
                                Tout voir
                            </button>
                        </div>
                    </div>

                    {/* Infos chambres */}
                    <div className={"flex gap-5 mb-5"}>
                        <div className={"flex justify-center items-center"}>
                            {hotelData.categories.map((cat, index) => (
                                <div key={index} className="flex items-center gap-4 text-sm text-black">
                                    <span className="flex items-center gap-1">
                                        <SvgIcon className="w-5" name="sizeRoom" size={21} /> {cat.area}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <SvgIcon className="w-5" name="bedRoom" size={21} /> {cat.bedType}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <SvgIcon className="w-5" name="userRoom" size={21} /> {cat.guests}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => openEditModal(hotelData.categories)}
                            className="ml-2 font-bold bg-yellow-200 hover:bg-yellow-500 px-2 py-1 rounded text-xs"
                        >
                            Modifier
                        </button>
                    </div>

                    <div 
                        className="mb-6 relative"
                        onMouseEnter={() => setShowDescriptionHover(true)}
                        onMouseLeave={() => setShowDescriptionHover(false)}
                    >
                        <p className="text-sm text-gray-700 leading-relaxed mt-2">
                            <span dangerouslySetInnerHTML={{ __html: hotelData.description }} />
                        </p>
                        {showDescriptionHover && (
                            <button
                                onClick={() => setSelectedModal('description')}
                                className="absolute top-0 right-0 bg-yellow-200 hover:bg-yellow-400 p-2 rounded-lg transition"
                                title="Modifier la description"
                            >
                                <Edit className="w-4 h-4 text-black" />
                            </button>
                        )}
                    </div>
                    {/* Commodités */}
                    <div className="mb-6">
                        <div className="flex items-center gap-5 mb-3 text-start -row-start-7">
                            <h3 className="font-semibold">Commodités</h3>
                            <button
                                onClick={() => setSelectedModal('amenities')}
                                className="bg-yellow-200 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
                            >
                                Modifier
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm text-gray-700">
                            {hotelData.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <SvgIcon
                                        name={amenityIcons[amenity] || 'defaultIcon'}
                                        className="w-5 h-5 text-gray-500"
                                        size={20}
                                    />
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sécurité */}
                    <div>
                        <div className="flex gap-5 items-center mb-3">
                            <h3 className="font-semibold">Sécurité</h3>
                            <button
                                onClick={() => setSelectedModal('security')}
                                className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
                            >
                                Modifier
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {hotelData.security.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-gray-700">
                                    <div className={"flex bg-green-200 rounded-2xl h-5 w-5 justify-center items-center"}>
                                        <CheckIcon className="h-4 w-4 text-black" />
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Colonne droite - Liste des catégories */}
                <div className="flex-1">
                    {/* Filtres */}
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="flex gap-5 justify-between">
                            <div className="relative w-full md:w-[420px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder='Rechercher le type de chambre, le numéro etc.'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 pt-3 pb-1 text-sm border border-gray-200 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200"
                                />
                            </div>
                            <div className="flex gap-2">
                                <span className="text-sm py-2 justify-center text-gray-700">Trier par :</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option>Populaire</option>
                                    <option>Prix croissant</option>
                                    <option>Prix décroissant</option>
                                </select>
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option>Tous types</option>
                                    <option>Standard</option>
                                    <option>Luxe</option>
                                    <option>Suite</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Liste des catégories */}
                    <div className="space-y-4">
                        {filteredCategories.map((category) => (
                            <div key={category.id} className="bg-white rounded-lg p-4 flex gap-10 border border-gray-100">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-50 h-35 object-cover rounded-lg cursor-pointer"
                                    onClick={() => openGallery(category)}
                                />

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-2xl font font-bold">{category.name}</h3>
                                        </div>
                                        <div className="flex text-right gap-14 justify-between">
                                            <div>
                                                <button
                                                    onClick={() => router.push(`/Chambres/${encodeURIComponent(category.name)}`)}
                                                    className="px-3 py-1 border font-bold border-orange-300 rounded text-sm hover:bg-gray-50">
                                                    Voir les chambres
                                                </button>
                                            </div>
                                            <div>
                                                <span className={`inline-block px-3 py-1 rounded-lg text-sm text-black bg-green-50`}>
                                                    {category.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"mb-1"}>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center justify-between gap-1">
                                                <SvgIcon className={"w-5 gap-2"} name={"sizeRoom"} size={21} /> {category.area}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <SvgIcon className={"w-5 gap-2"} name={"bedRoom"} size={21} /> {category.bedType}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <SvgIcon className={"w-5 gap-2"} name={"userRoom"} size={21} /> {category.guests}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                            {category.description}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-600">
                                            Disponibilité: <span className="font-semibold">{category.availability}</span>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => openEditModal(hotelData.categories)}
                                                className="ml-2 font-bold bg-yellow-200 hover:bg-yellow-500 px-2 py-1 rounded text-xs"
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                        <div className="flex text-right">
                                            <div className="text-sm font-bold text-gray-900">
                                                {category.price.toLocaleString()}
                                            </div>
                                            <div className="text-sm font-medium text-gray-400">
                                                /nuit
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {selectedModal === 'gallery' && selectedCategory && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div
                        className="relative bg-white rounded-2xl max-w-4xl h-[800%] w-[999px] mb-2 shadow-xl p-4 overflow-y-auto max-h-[90vh]">
                        {/* Bouton de fermeture */}
                        <button
                            onClick={() => setSelectedModal(null)}
                            className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                       <div className={"mt-[20%]"}>
                           <ImageGallery
                               images={selectedCategory.galleryImages || hotelData.galleryImages}
                               onClose={() => setSelectedModal(null)}
                           />
                       </div>
                    </div>
                </div>
            )}


            {selectedModal === 'security' && (
                <SecurityModal
                    security={hotelData.security}
                    onClose={() => setSelectedModal(null)}
                    onSave={(data) => handleSaveHotelData('security', data)}
                />
            )}

            {selectedModal === 'amenities' && (
                <AmenitiesModal
                    amenities={hotelData.amenities}
                    onClose={() => setSelectedModal(null)}
                    onSave={(data) => handleSaveHotelData('amenities', data)}
                />
            )}

            {selectedModal === 'editCategory' && categoryToEdit && (
                <EditCategoryModal
                    category={categoryToEdit}
                    onClose={() => setSelectedModal(null)}
                    onSave={handleRefresh}
                />
            )}
            {selectedModal === 'addCategory' && categoryToAdd && (
                <AddCategoryModal
                    category={categoryToAdd}
                    hotelId={hotelData?.hotel_id}
                    onClose={() => setSelectedModal(null)}
                    onSave={handleRefresh}
                />
            )}

            {selectedModal === 'description' && (
                <DescriptionModal
                    description={hotelData.description}
                    onClose={() => setSelectedModal(null)}
                    onSave={(newDescription) => handleSaveHotelData('description', newDescription)}
                />
            )}
        </div>
    );
}
