import RoomsMainPage from '@/app/(main)/components/Chambres/RoomsMainPage';

async function getHotelData() {
    const hotelData = {
        name: 'Hôtel Souaba',
        totalRooms: 25,
        mainImage: '/images/chambre/HotelRoom.png',
        galleryImages: [
            '/images/chambre/Details1Chambre.png',
            '/images/chambre/details2chambre.png',
            '/images/chambre/details3chambre.png',
        ],
        description: "Optez pour une chambre Deluxe pour plus d'espace et de luxe. Dotées d'un lit king-size, d'un coin salon séparé," +
            "d'un grand bureau et d'une télévision à écran plat de 55 pouces, ces Chambres sont idéales pour se détendre avec style.",
        amenities: [
            'Wi-Fi haut débit',
            'Coffre-fort dans la chambre',
            'Télévision à écran plat',
            'Climatisation',
            'Mini-réfrigérateur',
            'cafetière/théière'
        ],
        security: [
            'Désinfectants',
            'Kit de premiers',
            'Nettoyant quotidien',
            'Extincteurs',
            'Détecteur de fumée'
        ],
        categories:[
        {
            area: '25 m²',
            bedType: 'Queen Bed',
            guests: '2 guests',
            }
        ]
    };

    const categories = [
        {
            id: 1,
            name: 'Nom chambre 1',
            type: 'Standard',
            area: '25 m²',
            bedType: 'Queen Bed',
            guests: '2 guests',
            description: 'Séjour confortable et abordable pour voyageurs seuls ou en couple. Lit queen size,' +
                'salle de bain attenante, bureau et équipements essentiels.',
            availability: '22/30 Chambres',
            price: 900000,
            image: '/images/chambre/chambre1.png',
            galleryImages: Array(8).fill('/images/chambre/chambre1.png')
        },
        {
            id: 2,
            name: 'Nom chambre 2',
            type: 'Luxe',
            area: '35 m²',
            bedType: 'King Bed',
            guests: '2 guests',
            description: 'Plus d\'espace et de luxe. Lit king-size, salon séparé, grand bureau, télévision 55 pouces.' +
                ' Salle de bain attenante avec baignoire et douche.',
            availability: '18/25 Chambres',
            price: 800000,
            image: '/images/chambre/chambre02.png',
            galleryImages: Array(8).fill('/images/chambre/chambre1.png')
        },
        {
            id: 3,
            name: 'Nom chambre 3',
            type: 'Suite',
            area: '50 m²',
            bedType: 'King Bed',
            guests: '3 guests',
            description: 'Spacious and private with separate living and sleeping areas. King bed, furnished living room,' +
                ' kitchenette - ideal for extended stays.',
            availability: '8/10 Chambres',
            price: 700000,
            image: '/images/chambre/chambre03.png',
            galleryImages: Array(8).fill('/images/chambre/chambre1.png')
        },
        {
            id: 4,
            name: 'Nom chambre 4',
            type: 'Supérieure',
            area: '50 m²',
            bedType: 'King Bed',
            guests: '3 guests',
            description: 'Spacious and private with separate living and sleeping areas. King bed, furnished living room,' +
                ' kitchenette - ideal for extended stays.',
            availability: '8/10 Chambres',
            price: 700000,
            image: '/images/chambre/chambre03.png',
            galleryImages: Array(8).fill('/images/chambre/chambre1.png')
        }
    ];

    return { hotelData, categories };
}

export default async function ChambresPage() {
    const { hotelData, categories } = await getHotelData();

    return (
        <main className="min-h-screen bg-gray-50">
            <RoomsMainPage hotelData={hotelData} categories={categories} />
        </main>
    );
}
