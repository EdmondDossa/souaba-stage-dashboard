'use client';

import {SvgIcon} from "@/components/ui/common";

export default function ProfilePanel({ profile, onClose }) {
    if (!profile) return null;

    return (
        <div className="w-[450px] h-full bg-white pl-4 border-l border-gray-200 flex flex-col overflow-hidden">
            {/* Header - Fixe */}
            <div className="flex-shrink-0 pt-5 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-1.5 bg-primary hover:bg-orange-600 text-white text-sm rounded-lg flex items-center gap-1">
                            Populaire
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {onClose && (
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Avatar and Name */}
                <div className="flex flex-col items-center text-center mb-4">
                    <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-20 h-20 bg-[#E7F68E] rounded-full flex-shrink-0 object-cover object-top"
                    />
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mt-2">
                        {profile.name}
                        <button className="text-gray-400 hover:text-gray-600">
                            <SvgIcon name={"NotePencil"} className={""} size={21} />
                        </button>
                    </h3>
                    <p className="text-sm text-gray-500">{profile.phone}</p>
                </div>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto pr-4" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'transparent transparent'
            }}
                 onMouseEnter={(e) => e.currentTarget.style.scrollbarColor = '#cbd5e0 transparent'}
                 onMouseLeave={(e) => e.currentTarget.style.scrollbarColor = 'transparent transparent'}>

                {/* À propos */}
                <div className="mb-4">
                    <div className="flex items-center mb-3">
                        <SvgIcon name={'Info'} className={"pr-1"} size={21} />
                        <h4 className="text-sm font-medium text-gray-500 uppercase">À propos</h4>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{profile.about}</p>
                </div>

                {/* Médias */}
                <div className="mb-4">
                    <div className="flex items-center mb-3">
                        <SvgIcon name={'imgSvg'} className={"pr-1"} size={18} />
                        <h4 className="text-xs font-medium text-gray-500 uppercase">Médias ({profile.medias.length})</h4>
                        <button className="ml-auto text-xs text-gray-600 hover:text-gray-900">Afficher tout</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {profile.medias.map((media, index) => (
                            <div
                                key={index}
                                className="aspect-square w-32 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            >
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documents */}
                <div className="mb-4">
                    <div className="flex items-center mb-3">
                        <SvgIcon name={'fileSvg'} className={"pr-1"} size={18} />
                        <h4 className="text-xs font-medium text-gray-500 uppercase">Documents ({profile.documents.length})</h4>
                        <button className="ml-auto text-xs text-gray-600 hover:text-gray-900">Afficher tout</button>
                    </div>
                    <div className="space-y-2">
                        {profile.documents.map((doc, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-1 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <SvgIcon name={'pdf'} className={"p-1"} size={30} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                                        <p className="text-xs text-gray-500">{doc.size}</p>
                                    </div>
                                </div>
                                <button className="p-2 w-[30px] h-[30px] justify-center items-center bg-primary hover:bg-green-400 text-black rounded-lg">
                                    <SvgIcon name={'CaretRight'} className={""} size={40} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="mb-4">
                    <div className="flex items-center mb-3">
                        <SvgIcon name={'link'} className={"pr-1"} size={18} />
                        <h4 className="text-xs font-medium text-gray-500 uppercase">Links</h4>
                        <button className="ml-auto text-xs text-gray-600 hover:text-gray-900">Afficher tout</button>
                    </div>
                    <div className="space-y-2">
                        {profile.links.map((link, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <SvgIcon name={'link'} className={""} size={22} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900">{link.title}</p>
                                    <p className="text-xs text-gray-500 truncate">{link.url}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}