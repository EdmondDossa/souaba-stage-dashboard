import { useState, useEffect, useCallback, useRef } from 'react';
import getAxiosInstance from './request';

/**
 * Configuration centralisée des routes API
 */
export const API_ROUTES = {
  // Routes pour les hôtels
  HOTELS: {
    GET_ALL: '/hotels',
    GET_BY_ID: (id) => `/hotels/${id}`,
    CREATE: '/hotels',
    UPDATE: (id) => `/hotels/${id}`,
    VALIDATE: (id) => `/hotels/${id}/validate`,
    DELETE: (id) => `/hotels/${id}`,
    GET_STATS: '/hotels/stats',
    DELETE_MEDIA: (id, mediaId) => `/hotels/${id}/medias/${mediaId}`,
    SET_PRIMARY_MEDIA: (id, mediaId) => `/hotels/${id}/medias/${mediaId}/primary`,
  },
  
  // Routes pour les chambres
  ROOMS: {
    GET_ALL: '/hotel-room',
    GET_BY_ID: (id) => `/hotel-room/${id}`,
    GET_BY_HOTEL: (hotelId) => `/hotels/${hotelId}/rooms`,
    CREATE: '/hotel-room',
    UPDATE: (id) => `/hotel-room/${id}`,
    DELETE: (id) => `/hotel-room/${id}`,
    GET_STATS: '/hotel-room/stats',
  },
  
  // Routes pour les catégories de chambres
  ROOM_CATEGORIES: {
    GET_ALL: '/hotel-room-category',
    GET_BY_ID: (id) => `/hotel-room-category/${id}`,
    GET_BY_HOTEL: (hotelId) => `/hotels/${hotelId}/room-categories`,
    CREATE: '/hotel-room-category',
    UPDATE: (id) => `/hotel-room-category/${id}`,
    DELETE: (id) => `/hotel-room-category/${id}`,
    GET_WITH_MEDIA: '/hotel-room-category?include=media',
  },
  
  // Routes pour les réservations
  RESERVATIONS: {
    GET_ALL: '/reservations',
    GET_BY_ID: (id) => `/reservations/${id}`,
    GET_BY_USER: (userId) => `/users/${userId}/reservations`,
    GET_BY_HOTEL: (hotelId) => `/hotels/${hotelId}/reservations`,
    CREATE: '/reservations',
    UPDATE: (id) => `/reservations/${id}`,
    UPDATE_STATUS: (id) => `/reservations/${id}/status`,
    DELETE: (id) => `/reservations/${id}`,
  },
  
  // Routes pour les indisponibilités
  UNAVAILABILITIES: {
    GET_ALL: '/hotel-room-unavailabilities',
    GET_BY_ID: (id) => `/hotel-room-unavailabilities/unavailable/${id}`,
    GET_BY_ROOM: (roomId) => `/hotel-room-unavailabilities/unavailable/room/${roomId}`,
    GET_CALENDAR: (roomId, year, month) => `/hotel-room-unavailabilities/calendar/${roomId}/${year}/${month}`,
    CREATE: '/hotel-room-unavailabilities/unavailable',
    CREATE_BULK: '/hotel-room-unavailabilities/unavailable/bulk',
    CHECK_AVAILABILITY: '/hotel-room-unavailabilities/check',
    UPDATE: (id) => `/hotel-room-unavailabilities/unavailable/${id}`,
    DELETE: (id) => `/hotel-room-unavailabilities/unavailable/${id}`,
    UNBLOCK: (roomId) => `/hotel-room-unavailabilities/unblock/${roomId}`,
  },
  
  // Routes pour les utilisateurs
  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    GET_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  
  // Routes pour les finances
  FINANCES: {
    GET_REVENUE_STATS: '/finances/revenue-stats',
    GET_REVENUE_BY_PERIOD: (period) => `/finances/revenue?period=${period}`,
    GET_INVOICES: '/invoices',
    GET_INVOICE_BY_ID: (id) => `/invoices/${id}`,
    CREATE_INVOICE: '/invoices',
  },
  
  // Routes pour les activités
  ACTIVITIES: {
    GET_RECENT: '/activities/recent',
    GET_BY_TYPE: (type) => `/activities?type=${type}`,
    GET_BY_DATE_RANGE: (startDate, endDate) => `/activities?start=${startDate}&end=${endDate}`,
  },
  
  // Routes pour la maintenance
  MAINTENANCE: {
    GET_ALL: '/maintenance-records',
    GET_BY_ID: (id) => `/maintenance-records/${id}`,
    GET_BY_ROOM: (roomId) => `/hotel-room/${roomId}/maintenance`,
    CREATE: '/maintenance-records',
    UPDATE: (id) => `/maintenance-records/${id}`,
    DELETE: (id) => `/maintenance-records/${id}`,
  },
  
  // Routes pour les médias
  MEDIA: {
    UPLOAD_SINGLE: '/uploads/single',
    UPLOAD_MULTIPLE: '/uploads/multiple',
    GET_CONFIG: (mediaType) => `/uploads/config/${mediaType}`,
    GET_SUPPORTED_TYPES: '/uploads/supported-types',
    GET_BY_ID: (id) => `/uploads/${id}`,
    DELETE: (id) => `/uploads/${id}`,
    GET_URL: (id) => `/uploads/${id}/url`,
    GET_LIMITS: '/uploads/limits/all',
  },
  
  // Routes pour les accommodations
  ACCOMMODATIONS: {
    GET_ALL: '/accommodations',
    GET_BY_ID: (id) => `/accommodations/${id}`,
    CREATE: '/accommodations',
    UPDATE: (id) => `/accommodations/${id}`,
    VALIDATE: (id) => `/accommodations/${id}/validate`,
    DELETE: (id) => `/accommodations/${id}`,
    GET_STATS: '/accommodations/stats',
    DELETE_MEDIA: (id, mediaId) => `/accommodations/${id}/medias/${mediaId}`,
    SET_PRIMARY_MEDIA: (id, mediaId) => `/accommodations/${id}/medias/${mediaId}/primary`,
  },
  
  // Routes pour les indisponibilités d'accommodations
  ACCOMMODATION_UNAVAILABILITIES: {
    CREATE: '/accommodation-unavailable-period/unavailable',
    CREATE_BULK: '/accommodation-unavailable-period/unavailable/bulk',
    CHECK: '/accommodation-unavailable-period/check',
    SEARCH: '/accommodation-unavailable-period/search',
    GET_BY_ACCOMMODATION: (id) => `/accommodation-unavailable-period/unavailable/accommodation/${id}`,
    GET_CALENDAR: (accommodationId, year, month) => `/accommodation-unavailable-period/calendar/${accommodationId}/${year}/${month}`,
    UPDATE: (id) => `/accommodation-unavailable-period/unavailable/${id}`,
    DELETE: (id) => `/accommodation-unavailable-period/unavailable/${id}`,
    UNBLOCK: (accommodationId) => `/accommodation-unavailable-period/unblock/${accommodationId}`,
  },
  
  // Routes pour les partenaires
  PARTNERS: {
    GET_ALL: '/partners',
    GET_STATS: '/partners/stats',
    BECOME_HOTEL: '/partners/become-hotel',
    BECOME_ACCOMMODATION: '/partners/become-accommodation',
    VALIDATE: (id) => `/partners/${id}/validate`,
    REJECT: (id) => `/partners/${id}/reject`,
    REQUEST_DELETION: '/partners/request-deletion',
    CONFIRM_DELETION: (id) => `/partners/${id}/confirm-deletion`,
  },
};

/**
 * Fonction utilitaire pour extraire les données de la réponse API
 * Gère le format paginé { data: [...], pagination: {...} }
 */
const extractDataFromResponse = (response) => {
  if (!response || !response.data) return [];
  
  // Si c'est déjà un tableau, le retourner tel quel
  if (Array.isArray(response.data)) {
    return response.data;
  }
  
  // Si c'est un objet avec une propriété 'data' (format paginé)
  if (response.data.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  
  // Si c'est un objet avec d'autres propriétés de tableau communes
  if (response.data.items && Array.isArray(response.data.items)) {
    return response.data.items;
  }
  
  if (response.data.results && Array.isArray(response.data.results)) {
    return response.data.results;
  }
  
  // Sinon retourner un tableau vide
  return [];
};

/**
 * Hook générique pour les appels API avec gestion du loading et des erreurs
 */
export const useFetch = (url, options = {}) => {
  const {
    immediate = true,
    defaultValue = null,
    transform = (data) => data,
    dependencies = [],
  } = options;

  const transformRef = useRef(transform);
  const defaultValueRef = useRef(defaultValue);

  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    transformRef.current = transform;
    defaultValueRef.current = defaultValue;
  }, [transform, defaultValue]);

  const fetchData = useCallback(async (customUrl = url) => {
    if (!customUrl) return;

    try {
      setLoading(true);
      setError(null);
      const axios = getAxiosInstance();
      const response = await axios.get(customUrl);

      // Extraire les données avec la fonction utilitaire
      const rawData = extractDataFromResponse(response);
      const transformedData = transformRef.current(rawData);
      setData(transformedData);
      return transformedData;
    } catch (err) {
      //console.error(`Erreur lors de la récupération des données depuis ${customUrl}:`, err);
      setError(err);
      setData(defaultValueRef.current);
      return defaultValueRef.current;
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- dependencies are provided by callers as values to watch
  }, [fetchData, immediate, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Hook spécialisé pour récupérer les données des hôtels
 */
export const useHotels = () => {
  return useFetch(API_ROUTES.HOTELS.GET_ALL, {
    defaultValue: [],
    transform: (data) => {
      if (!Array.isArray(data)) return [];
      return data;
    }
  });
};

/**
 * Hook spécialisé pour récupérer les données des chambres
 */
export const useRooms = () => {
  return useFetch(API_ROUTES.ROOMS.GET_ALL, {
    defaultValue: [],
    transform: (data) => {
      // S'assurer que data est un tableau
      if (!Array.isArray(data)) return [];
      return data;
    }
  });
};

/**
 * Hook spécialisé pour récupérer les statistiques des chambres
 */
export const useRoomStats = () => {
  const defaultStats = [
    { label: "Occupée", value: 0, color: "bg-[#D5F6E5]" },
    { label: "Réservée", value: 0, color: "bg-[#F3FBC7]" },
    { label: "Disponible", value: 0, color: "bg-[#E7F68E]" },
    { label: "Pas prêt", value: 0, color: "bg-[#CCD97E]" },
  ];

  return useFetch(API_ROUTES.ROOMS.GET_ALL, {
    defaultValue: defaultStats,
    transform: (rooms) => {
      // Vérifier que rooms est un tableau
      if (!Array.isArray(rooms)) return defaultStats;

      const occupied = rooms.filter(r => r && r.status === 'OCCUPIED').length;
      const reserved = rooms.filter(r => r && r.status === 'RESERVED').length;
      const available = rooms.filter(r => r && r.status === 'AVAILABLE').length;
      const notReady = rooms.filter(r => 
        r && ['CLEANING', 'MAINTENANCE', 'OUT_OF_ORDER'].includes(r.status)
      ).length;

      return [
        { label: "Occupée", value: occupied, color: "bg-[#D5F6E5]" },
        { label: "Réservée", value: reserved, color: "bg-[#F3FBC7]" },
        { label: "Disponible", value: available, color: "bg-[#E7F68E]" },
        { label: "Pas prêt", value: notReady, color: "bg-[#CCD97E]" },
      ];
    }
  });
};

/**
 * Hook spécialisé pour récupérer les réservations
 */
export const useReservations = () => {
  return useFetch(API_ROUTES.RESERVATIONS.GET_ALL, {
    defaultValue: [],
    transform: (data) => {
      // S'assurer que data est un tableau
      if (!Array.isArray(data)) return [];
      return data;
    }
  });
};

/**
 * Hook spécialisé pour récupérer les données de revenus
 */
export const useRevenueData = () => {
  const monthNamesFr = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  return useFetch(API_ROUTES.RESERVATIONS.GET_ALL, {
    defaultValue: [],
    transform: (reservations) => {
      // Vérifier que reservations est un tableau
      if (!Array.isArray(reservations)) return [];

      const revenueByMonth = {};
      
      reservations.forEach(reservation => {
        if (!reservation || reservation.status === 'CANCELLED') return;
        
        // Support des deux formats
        const totalPrice = reservation.total_price || reservation.totalPrice;
        if (!totalPrice) return;
        
        try {
          const date = new Date(reservation.createdAt);
          if (isNaN(date.getTime())) return;
          
          const monthYear = `${monthNamesFr[date.getMonth()]} ${date.getFullYear()}`;
          const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
          
          if (!revenueByMonth[key]) {
            revenueByMonth[key] = {
              month: monthYear,
              value: 0,
              date: new Date(date.getFullYear(), date.getMonth(), 1)
            };
          }
          
          revenueByMonth[key].value += parseFloat(totalPrice) || 0;
        } catch (error) {
          console.warn('Erreur lors du traitement de la réservation:', reservation, error);
        }
      });
      
      return Object.values(revenueByMonth)
        .filter(item => item && item.date)
        .sort((a, b) => a.date - b.date);
    }
  });
};

/**
 * Hook spécialisé pour récupérer les activités récentes
 */
export const useRecentActivities = () => {
  const ACTIVITY_TYPES = {
    NEW_RESERVATION: {
      icon: "SignIn",
      color: "bg-[#E7F68E]",
      getTitle: () => "Nouvelle réservation",
      getDescription: (data) => `Réservation ${data.reservation_id || 'N/A'} créée pour ${data.guestName || 'Invité'}`
    },
    CHECK_IN: {
      icon: "SignIn",
      color: "bg-[#E7F68E]",
      getTitle: () => "Enregistrement des invités",
      getDescription: (data) => `${data.guestName || 'Invité'} a terminé le processus d'enregistrement.`
    },
    CHECK_OUT: {
      icon: "SignOut",
      color: "bg-[#D5F6E5]",
      getTitle: () => "Départ des invités",
      getDescription: (data) => `${data.guestName || 'Invité'} a terminé le processus de départ.`
    },
    MAINTENANCE: {
      icon: "WarningOctagon",
      color: "bg-[#D5F6E5]",
      getTitle: () => "Demande de maintenance enregistrée",
      getDescription: (data) => `Maintenance ${data.type || 'générale'} programmée pour la chambre ${data.roomNumber || 'N/A'}.`
    },
    ROOM_READY: {
      icon: "CircleWavyCheck",
      color: "bg-[#E7F68E]",
      getTitle: () => "Nettoyage de la chambre terminé",
      getDescription: (data) => `La chambre ${data.roomNumber || 'N/A'} a été nettoyée et préparée.`
    }
  };

  return useFetch(API_ROUTES.RESERVATIONS.GET_ALL, {
    defaultValue: [],
    transform: (reservations) => {
      // Vérifier que reservations est un tableau
      if (!Array.isArray(reservations)) return [];

      const allActivities = [];
      
      reservations.forEach(reservation => {
        if (!reservation) return;
        
        try {
          const guestName = `${reservation.user?.firstName || ''} ${reservation.user?.lastName || ''}`.trim() || 'Invité';
          
          // Nouvelle réservation
          if (['PENDING', 'CONFIRMED'].includes(reservation.status)) {
            allActivities.push({
              time: new Date(reservation.createdAt),
              type: 'NEW_RESERVATION',
              data: { 
                reservation_id: reservation.reservation_id,
                guestName 
              }
            });
          }
          
          // Check-in
          if (reservation.status === 'CHECKED_IN') {
            allActivities.push({
              time: new Date(reservation.updatedAt || reservation.createdAt),
              type: 'CHECK_IN',
              data: { guestName }
            });
          }
          
          // Check-out
          if (reservation.status === 'CHECKED_OUT') {
            allActivities.push({
              time: new Date(reservation.updatedAt || reservation.createdAt),
              type: 'CHECK_OUT',
              data: { guestName }
            });
          }
        } catch (error) {
          console.warn('Erreur lors du traitement de l\'activité:', reservation, error);
        }
      });
      
      // Filtrer les activités avec des dates valides
      const validActivities = allActivities.filter(activity => 
        activity && activity.time && !isNaN(activity.time.getTime())
      );
      
      // Trier par date décroissante et prendre les 5 plus récentes
      validActivities.sort((a, b) => b.time - a.time);
      
      return validActivities.slice(0, 5).map(activity => {
        const config = ACTIVITY_TYPES[activity.type] || ACTIVITY_TYPES.NEW_RESERVATION;
        const now = new Date();
        const diffMinutes = Math.floor((now - activity.time) / 60000);
        
        let timeLabel;
        if (diffMinutes < 60) {
          timeLabel = `Il y a ${Math.max(0, diffMinutes)} min`;
        } else if (diffMinutes < 1440) {
          timeLabel = `Il y a ${Math.floor(diffMinutes / 60)} h`;
        } else {
          timeLabel = activity.time.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'short' 
          });
        }
        
        return {
          time: timeLabel,
          title: config.getTitle(),
          description: config.getDescription(activity.data),
          color: config.color,
          icon: config.icon
        };
      });
    }
  });
};

/**
 * Hook spécialisé pour récupérer les données d'hôtel avec catégories pour la page Chambres
 */
export const useHotelWithCategories = () => {
  const defaultReturn = {
    hotelData: {
      hotel_id: null,
      name: 'Aucun hôtel',
      totalRooms: 0,
      mainImage: '/images/chambre/HotelRoom.png',
      galleryImages: [],
      description: '',
      amenities: [],
      security: [],
      categories: []
    },
    categories: []
  };

  return useFetch(API_ROUTES.HOTELS.GET_ALL, {
    defaultValue: defaultReturn,
    transform: (hotels) => {
      // Vérifier que hotels est un tableau
      if (!Array.isArray(hotels) || hotels.length === 0) {
        return defaultReturn;
      }
      
      try {
        const hotel = hotels[0];
        if (!hotel) return defaultReturn;
        
        // Mapper les médias de l'hôtel
        const hotelMedias = Array.isArray(hotel.HotelMedia) ? hotel.HotelMedia : [];
        const primaryMedia = hotelMedias.find(m => m && m.is_primary);
        const galleryMedias = hotelMedias.filter(m => m && !m.is_primary).slice(0, 3);
        
        // Calculer le nombre total de chambres
        const roomCategories = Array.isArray(hotel.HotelRoomCategories) ? hotel.HotelRoomCategories : [];
        const totalRooms = roomCategories.reduce((sum, cat) => {
          if (!cat) return sum;
          const roomsArray = Array.isArray(cat.HotelRoom) ? cat.HotelRoom : [];
          return sum + roomsArray.length;
        }, 0);
        
        // Mapper les catégories de chambres
        const mappedCategories = roomCategories.map(category => {
          if (!category) return null;
          
          const categoryMedias = Array.isArray(category.HotelRoomCategoryMedia) ? category.HotelRoomCategoryMedia : [];
          const primaryCategoryMedia = categoryMedias.find(m => m && m.is_primary);
          const totalCategoryRooms = category.number_of_rooms || 0;
          const roomsArray = Array.isArray(category.HotelRoom) ? category.HotelRoom : [];
          const availableRooms = roomsArray.filter(r => r && r.status === 'AVAILABLE').length;
          
          const typeMap = {
            'STANDARD': 'Standard',
            'LUXE': 'Luxe',
            'SUITE': 'Suite'
          };
          
          return {
            id: category.room_category_id,
            name: category.name || 'Catégorie sans nom',
            type: typeMap[category.type] || category.type || 'Standard',
            area: category.area,
            bedType: `${category.capacity || 1} personnes`,
            guests: `${category.capacity || 1} invités`,
            description: category.description || '',
            availability: `${availableRooms}/${totalCategoryRooms} Chambres`,
            price: parseFloat(category.price_per_night) || 0,
            image: primaryCategoryMedia?.media?.file_path || '/images/chambre/chambre1.png',
            galleryImages: categoryMedias.map(m => m?.media?.file_path).filter(Boolean),
            number_of_bathrooms: category.number_of_bathrooms || 1,
            amenities: Array.isArray(category.amenities) ? category.amenities : []
          };
        }).filter(Boolean); // Filtrer les catégories nulles
        
        const hotelData = {
          hotel_id: hotel.hotel_id,
          name: hotel.name || 'Hôtel sans nom',
          totalRooms: totalRooms,
          mainImage: primaryMedia?.media?.file_path || '/images/chambre/HotelRoom.png',
          galleryImages: galleryMedias.map(m => m?.media?.file_path).filter(Boolean),
          description: hotel.description || '',
          amenities: Array.isArray(hotel.amenities) ? hotel.amenities : [],
          security: [],
          categories: [{
            area: hotel.area,
            bedType: 'Divers',
            guests: 'Variable'
          }]
        };
        
        return { hotelData, categories: mappedCategories };
      } catch (error) {
        console.error('Erreur lors du traitement des données d\'hôtel:', error);
        return defaultReturn;
      }
    }
  });
};

/**
 * Hook spécialisé pour récupérer les données de disponibilité des chambres
 */
export const useRoomAvailability = () => {
  const STATUS_MAP = {
    'AVAILABLE': { label: 'Disponible', statusType: 'disponible', color: '' },
    'OCCUPIED': { label: 'Occupé', statusType: 'occupe', color: 'green' },
    'OUT_OF_ORDER': { label: 'Hors service', statusType: 'hors-service', color: 'red' },
    'MAINTENANCE': { label: 'En maintenance', statusType: 'hors-service', color: 'red' },
    'CLEANING': { label: 'En nettoyage', statusType: 'propre', color: 'green' },
    'RESERVED': { label: 'Réservée', statusType: 'occupe', color: 'green' }
  };

  const ROOM_TYPE_MAP = {
    'STANDARD': 'Standard',
    'LUXE': 'Luxe',
    'SUITE': 'Suite'
  };

  const defaultReturn = { rooms: [], floors: [] };

  return useFetch(API_ROUTES.ROOMS.GET_ALL, {
    defaultValue: defaultReturn,
    transform: (rooms) => {
      //  Vérifier que rooms est un tableau
      if (!Array.isArray(rooms)) return defaultReturn;

      try {
        const floorMap = {};
        const mappedRooms = rooms.map(room => {
          if (!room) return null;
          
          const floor = room.floor || 0;
          
          if (!floorMap[floor]) {
            floorMap[floor] = 0;
          }
          floorMap[floor]++;
          
          // Trouver l'indisponibilité active
          const now = new Date();
          const unavailabilities = Array.isArray(room.unavailabilities) ? room.unavailabilities : [];
          const activeUnavailability = unavailabilities.find(unavail => {
            if (!unavail || !unavail.start_date || !unavail.end_date) return false;
            const start = new Date(unavail.start_date);
            const end = new Date(unavail.end_date);
            return !isNaN(start.getTime()) && !isNaN(end.getTime()) && now >= start && now <= end;
          });
          
          const statusInfo = STATUS_MAP[room.status] || STATUS_MAP.AVAILABLE;
          
          // Essayer de récupérer le type depuis room.category OU directement depuis l'API
          let roomType = '';
          if (room.category && room.category.type) {
            roomType = ROOM_TYPE_MAP[room.category.type] || room.category.type;
          } else if (room.type) {
            roomType = ROOM_TYPE_MAP[room.type] || room.type;
          } else if (room.room_type) {
            roomType = ROOM_TYPE_MAP[room.room_type] || room.room_type;
          }
          
          // Formater les dates si indisponibilité
          let dates = '----------';
          let day = null;
          if (activeUnavailability) {
            try {
              const startDate = new Date(activeUnavailability.start_date);
              const endDate = new Date(activeUnavailability.end_date);
              dates = `${startDate.toLocaleDateString('fr-FR')} au ${endDate.toLocaleDateString('fr-FR')}`;
              day = startDate.getDate();
            } catch (error) {
              console.warn('Erreur de formatage des dates d\'indisponibilité:', error);
            }
          }
          
          return {
            hotel_room_id: room.hotel_room_id,
            floor: floor,
            number: room.room_number || 'N/A',
            type: roomType,
            status: activeUnavailability ? (activeUnavailability.reason || statusInfo.label) : statusInfo.label,
            dates: dates,
            statusType: statusInfo.statusType,
            color: statusInfo.color,
            day: day,
            is_active: room.is_active !== false,
            category_id: room.category?.room_category_id || null
          };
        }).filter(Boolean); // Filtrer les chambres nulles
        
        // Créer la liste des étages
        const floorsList = Object.keys(floorMap).map(floor => ({
          id: parseInt(floor),
          name: `Etage ${floor}`,
          rooms: floorMap[floor]
        })).sort((a, b) => a.id - b.id);
        
        return { rooms: mappedRooms, floors: floorsList };
      } catch (error) {
        console.error('Erreur lors du traitement des données de disponibilité:', error);
        return defaultReturn;
      }
    }
  });
};

/**
 * Hook générique pour les mutations (POST, PUT, DELETE)
 */
export const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (url, options = {}) => {
    const { method = 'POST', data = null, params = {} } = options;
    
    try {
      setLoading(true);
      setError(null);
      const axios = getAxiosInstance();
      
      let response;
      switch (method.toLowerCase()) {
        case 'post':
          response = await axios.post(url, data);
          break;
        case 'put':
          response = await axios.put(url, data);
          break;
        case 'patch':
          response = await axios.patch(url, data);
          break;
        case 'delete':
          response = await axios.delete(url);
          break;
        default:
          response = await axios.get(url, { params });
      }
      
      // Extraire les données avec la fonction utilitaire
      return extractDataFromResponse(response);
    } catch (err) {
      console.error(`Erreur lors de la mutation ${method} sur ${url}:`, err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

export default API_ROUTES;
