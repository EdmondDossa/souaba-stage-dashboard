'use client';
import { useState } from 'react';

export default function ImageGalleryModal({ images, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="fixed inset-0 bg-gray-800/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="relative w-full max-w-6xl mx-4 bg-white rounded-2xl"
                 onClick={(e) => e.stopPropagation()}
            >
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className={"flex-1 mt-[5%]"}>

                    {/* Image principale */}
                <div className={"flex-1 items-center justify-center pt-10 pb-10 pl-50 pr-50"}>
                    <div className="relative flex justify-center bg-gray-200 rounded-2xl">
                        <img
                            src={images[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                            className="w-[40rem] h-[40rem] p-5 rounded-4xl"
                        />

                        {/* Boutons navigation */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Miniatures */}
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-24 h-16 object-cover rounded cursor-pointer flex-shrink-0 ${
                                    idx === currentIndex
                                        ? 'ring-4 ring-orange-500'
                                        : 'opacity-60 hover:opacity-100'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}