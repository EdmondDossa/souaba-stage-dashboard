import RoomList from '@/app/(main)/components/chambres/RoomList';

// Fonction pour récupérer les chambres d'une catégorie
async function getCategoryRooms(category) {
        return [
            {
                id: 1,
                number: 'Luxe Room 101',
                capacity: 5,
                floor: 5,
                status: 'Occupée',
                category: 'Luxe'
            },
            {
                id: 2,
                number: 'Luxe Room 102',
                capacity: 4,
                floor: 4,
                status: 'Hors service',
                category: 'Luxe'
            },
            {
                id: 3,
                number: 'Luxe Room 103',
                capacity: 2,
                floor: 2,
                status: 'Disponible',
                category: 'Luxe'
            },
            {
                id: 4,
                number: 'Luxe Room 104',
                capacity: 6,
                floor: 6,
                status: 'Occupée',
                category: 'Luxe'
            },
            {
                id: 5,
                number: 'Luxe Room 105',
                capacity: 4,
                floor: 4,
                status: 'Disponible',
                category: 'Luxe'
            },
            {
                id: 6,
                number: 'Luxe Room 106',
                capacity: 3,
                floor: 3,
                status: 'Disponible',
                category: 'Luxe'
            },
            {
                id: 7,
                number: 'Luxe Room 107',
                capacity: 6,
                floor: 6,
                status: 'Hors service',
                category: 'Luxe'
            },
            {
                id: 8,
                number: 'Luxe Room 108',
                capacity: 9,
                floor: 9,
                status: 'Hors service',
                category: 'Luxe'
            },
            {
                id: 9,
                number: 'Luxe Room 109',
                capacity: 1,
                floor: 1,
                status: 'Hors service',
                category: 'Luxe'
            },
            {
                id: 10,
                number: 'Luxe Room 200',
                capacity: 8,
                floor: 8,
                status: 'Disponible',
                category: 'Luxe'
            },{
                id: 11,
                number: 'Luxe Room 201',
                capacity: 8,
                floor: 8,
                status: 'Disponible',
                category: 'Luxe'
            },{
                id: 12,
                number: 'Luxe Room 202',
                capacity: 8,
                floor: 8,
                status: 'Disponible',
                category: 'Luxe'
            },{
                id: 13,
                number: 'Luxe Room 203',
                capacity: 8,
                floor: 8,
                status: 'Disponible',
                category: 'Luxe'
            },{
                id: 14,
                number: 'Luxe Room 203',
                capacity: 8,
                floor: 8,
                status: 'Disponible',
                category: 'Luxe'
            },
        ];
}

export default async function CategoryPage({ params }) {
    const { categorie } = params;
    const rooms = await getCategoryRooms(categorie);

    // Décoder le nom de la catégorie depuis l'URL
    const categoryName = decodeURIComponent(categorie);

    return (
        <main className="min-h-screen bg-gray-50">
            <RoomList initialRooms={rooms} category={categoryName} />
        </main>
    );
}

// Générer les métadonnées pour la page
export async function generateMetadata({ params }) {
    const { categorie } = params;
    const categoryName = decodeURIComponent(categorie);

    return {
        title: `${categoryName} - Chambres | Souaba`,
        description: `Liste des chambres dans la catégorie ${categoryName}`,
    };
}