// components/messages/MessagesPage.js
'use client';
import { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import ProfilePanel from './ProfilePanel';

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [allMessages, setAllMessages] = useState({});

    // Mock data - conversations (clients)
    const conversations = [
        {
            id: 1,
            name: 'Alice Johnson',
            avatar: '/images/messages/aliceJohnson.png',
            lastMessage: 'Puis-je demander un départ tardif pour la ch...',
            time: '09:15 AM',
            unread: 0,
            online: true
        },
        {
            id: 2,
            name: 'Michael Brown',
            avatar: '/images/messages/michaelBrown.png',
            lastMessage: 'La climatisation dans ma chambre ne fo...',
            time: '09:30 AM',
            unread: 1,
            online: false
        },
        {
            id: 3,
            name: 'Emily Davis',
            avatar: '/images/messages/emilieDavis.png',
            lastMessage: 'Pouvez-vous confirmer ma prise en char...',
            time: '09:45 AM',
            unread: 2,
            online: true
        },
        {
            id: 4,
            name: 'John Doe',
            avatar: '/images/messages/johnDoe.png',
            lastMessage: 'J\'ai besoin de serviettes et d\'oreillers su...',
            time: '10:00 AM',
            unread: 1,
            online: false
        },
        {
            id: 5,
            name: 'Jane Smith',
            avatar: '/placeholder-avatar-5.jpg',
            lastMessage: 'Le petit-déjeuner est-il inclus dans ma r...',
            time: '10:15 AM',
            unread: 3,
            online: true
        },
        {
            id: 6,
            name: 'Daniel Wilson',
            avatar: '/placeholder-avatar-6.jpg',
            lastMessage: 'Quelles sont les heures d\'ouverture de l...',
            time: '10:30 AM',
            unread: 2,
            online: false
        },
        {
            id: 7,
            name: 'Sarah Johnson',
            avatar: '/placeholder-avatar-7.jpg',
            lastMessage: 'Pouvez-vous m\'aider à réserver une visi...',
            time: '10:45 AM',
            unread: 1,
            online: true
        },
        {
            id: 8,
            name: 'Kevin Lee',
            avatar: '/placeholder-avatar-8.jpg',
            lastMessage: 'Je dois prolonger mon séjour de deux n...',
            time: '11:00 AM',
            unread: 1,
            online: false
        },
        {
            id: 9,
            name: 'Laura Martin',
            avatar: '/placeholder-avatar-9.jpg',
            lastMessage: 'Il y a un problème de bruit dans la pièce à cô...',
            time: '11:15 AM',
            unread: 0,
            online: true
        },
        {
            id: 10,
            name: 'Robert King',
            avatar: '/placeholder-avatar-10.jpg',
            lastMessage: 'Pourriez-vous envoyer quelqu\'un pour répar...',
            time: '11:30 AM',
            unread: 0,
            online: false
        }
    ];

    // Générer des messages pour chaque conversation - DÉFINI EN DEHORS DU useEffect
    const generateMessages = (conversationId, name) => {
        // Messages spécifiques pour Alice Johnson (id: 1)
        if (conversationId === 1) {
            return [
                {
                    id: 1,
                    text: 'Puis-je demander un départ tardif pour la chambre 305 ?',
                    time: '9:15 PM',
                    sender: 'client',
                    date: 'Today, June 19'
                },
                {
                    id: 2,
                    text: 'Bonjour Alice, nous pouvons organiser un départ tardif. À quelle heure souhaitez-vous rester ?',
                    time: '9:20 AM',
                    sender: 'admin'
                },
                {
                    id: 3,
                    text: 'J\'espérais rester jusqu\'à 14 heures. Est-ce possible ?',
                    time: '9:22 AM',
                    sender: 'client'
                },
                {
                    id: 4,
                    text: 'Laissez-moi vérifier la disponibilité de la chambre 305. Un instant, s\'il vous plaît.',
                    time: '9:25 AM',
                    sender: 'admin'
                },
                {
                    id: 5,
                    text: 'Bonne nouvelle, Alice ! Nous pouvons prolonger votre heure de départ jusqu\'à 14 h.',
                    time: '9:30 AM',
                    sender: 'admin'
                },
                {
                    id: 6,
                    text: 'Merci beaucoup ! C\'est vraiment utile.',
                    time: '9:32 AM',
                    sender: 'client'
                },
                {
                    id: 7,
                    text: 'De rien ! Si vous avez besoin d\'autre chose, n\'hésitez pas à nous le faire savoir.',
                    time: '09:35 AM',
                    sender: 'admin'
                }
            ];
        }

        // Messages génériques pour les autres conversations
        const messageTemplates = [
            {
                client: 'La climatisation dans ma chambre ne fonctionne pas.',
                admin: 'Je suis désolé pour ce désagrément. Nous envoyons immédiatement quelqu\'un pour vérifier.'
            },
            {
                client: 'Pouvez-vous confirmer ma prise en charge à l\'aéroport ?',
                admin: 'Bien sûr ! Votre prise en charge est confirmée pour 14h30. Le chauffeur vous attendra à la sortie.'
            },
            {
                client: 'J\'ai besoin de serviettes et d\'oreillers supplémentaires.',
                admin: 'Pas de problème ! Nous vous apportons cela dans les 10 prochaines minutes.'
            },
            {
                client: 'Le petit-déjeuner est-il inclus dans ma réservation ?',
                admin: 'Oui, le petit-déjeuner est inclus. Il est servi de 7h à 10h30 au restaurant principal.'
            },
            {
                client: 'Quelles sont les heures d\'ouverture de la piscine ?',
                admin: 'La piscine est ouverte tous les jours de 6h à 22h. Des serviettes sont disponibles au bord de la piscine.'
            }
        ];

        const template = messageTemplates[(conversationId - 2) % messageTemplates.length];

        return [
            {
                id: 1,
                text: template.client,
                time: '9:15 AM',
                sender: 'client',
                date: 'Today, June 19'
            },
            {
                id: 2,
                text: template.admin,
                time: '9:20 AM',
                sender: 'admin'
            },
            {
                id: 3,
                text: 'Merci beaucoup pour votre aide !',
                time: '9:25 AM',
                sender: 'client'
            },
            {
                id: 4,
                text: 'Avec plaisir ! N\'hésitez pas si vous avez besoin d\'autre chose.',
                time: '9:30 AM',
                sender: 'admin'
            }
        ];
    };

    // Générer les profils pour chaque conversation
    const generateProfile = (conversationId, name) => {
        return {
            name: name,
            phone: `G011-98765${conversationId}321`,
            avatar: `/placeholder-avatar-${conversationId}.jpg`,
            about: `Client régulier de l'hôtel Souaba. Apprécie le service personnalisé et les chambres confortables.`,
            medias: Array(6).fill(`/placeholder-media-${conversationId}.jpg`),
            documents: [
                { name: `Invoice-24052${conversationId}.pdf`, size: '1,45 mb' },
                { name: `Invoice-12032${conversationId}.pdf`, size: '1,58 mb' },
                { name: `Invoice-01122${conversationId}.pdf`, size: '1,64 mb' }
            ],
            links: [
                { title: 'Summer Staycation PROMO!', url: 'www.instagram.com' },
                { title: 'Corporate/Group Discounts!', url: 'www.x.com' }
            ]
        };
    };

    // Initialiser les messages au chargement - UNE SEULE FOIS
    useEffect(() => {
        const initialMessages = {};
        conversations.forEach(conv => {
            initialMessages[conv.id] = generateMessages(conv.id, conv.name);
        });
        setAllMessages(initialMessages);

        // Sélectionner Alice Johnson par défaut
        if (conversations.length > 0) {
            setSelectedConversation(conversations[0]);
        }
    }, []); // Dépendances vides pour exécuter une seule fois

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
    };

    const handleSendMessage = (text) => {
        if (!selectedConversation || !text.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: text,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            sender: 'admin'
        };

        setAllMessages(prev => ({
            ...prev,
            [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
        }));
    };

    return (
        <div className={"rounded-2xl flex h-screen"}>
            <div className="m-3 flex-1 flex bg-white rounded-2xl overflow-hidden">
                {/* Liste des conversations */}
                <ConversationList
                    conversations={conversations}
                    selectedId={selectedConversation?.id}
                    onSelectConversation={handleSelectConversation}
                />

                {/* Fenêtre de chat */}
                {selectedConversation ? (
                    <ChatWindow
                        conversation={selectedConversation}
                        messages={allMessages[selectedConversation.id] || []}
                        onSendMessage={handleSendMessage}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-white">
                        <div className="text-center">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
                        </div>
                    </div>
                )}

                {/* Panneau de profil du CLIENT - toujours visible */}
                {selectedConversation && (
                    <ProfilePanel
                        profile={generateProfile(selectedConversation.id, selectedConversation.name)}
                    />
                )}
            </div>
        </div>
    );
}