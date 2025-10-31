import MessagesPage from '@/app/(main)/components/messages/MessagesPage';

export default function Messages() {
    return (
        <main className="h-screen overflow-hidden">
            <MessagesPage />
        </main>
    );
}

// Métadonnées de la page
export const metadata = {
    title: 'Messages | Souaba',
    description: 'Messagerie pour la gestion des communications avec les clients',
};