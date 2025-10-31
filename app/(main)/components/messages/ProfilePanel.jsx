'use client';

export default function ProfilePanel({ profile, onClose }) {
    if (!profile) return null;

    return (
        <div className="w-96 bg-white pl-4 border-gray-200 flex flex-col overflow-y-auto">
            {/* Header */}
            <div className=" border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-1.5 bg-primary hover:bg-orange-600 text-white text-sm rounded-lg flex items-center gap-1">
                            Populaire
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Avatar and Name */}
                <div className="flex flex-col items-center text-center mb-4">
                    <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-20 h-20 bg-primary rounded-full flex-shrink-0 object-cover object-top"
                    />
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {profile.name}
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    </h3>
                    <p className="text-sm text-gray-500">{profile.phone}</p>
                </div>
            </div>

            {/* À propos */}
            <div className="pl-4 pr-4 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">À propos</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{profile.about}</p>
            </div>

            {/* Médias */}
            <div className="p-4 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-medium text-gray-500 uppercase">Médias ({profile.medias.length})</h4>
                    <button className="mr-4 text-xs text-gray-600 hover:text-gray-900">Afficher tout</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {profile.medias.map((media, index) => (
                        <div
                            key={index}
                            className="aspect-square w-24 h-18 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                        >
                        </div>
                    ))}
                </div>
            </div>

            {/* Documents */}
            <div className="p-5 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-medium text-gray-500 uppercase">Documents ({profile.documents.length})</h4>
                    <button className="text-xs text-gray-600 hover:text-gray-900">Afficher tout</button>
                </div>
                <div className="space-y-2">
                    {profile.documents.map((doc, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-1 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.size}</p>
                                </div>
                            </div>
                            <button className="p-2 bg-primary hover:bg-green-400 text-black rounded-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Links */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-medium text-gray-500 uppercase">Links</h4>
                    <button className="text-xs text-gray-600 hover:text-gray-900">Afficher tout</button>
                </div>
                <div className="space-y-2">
                    {profile.links.map((link, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3  rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{link.title}</p>
                                <p className="text-xs text-gray-500 truncate">{link.url}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}