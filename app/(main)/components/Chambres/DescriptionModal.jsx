'use client';
import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function DescriptionModal({ description, onClose, onSave }) {
    const [content, setContent] = useState(description);
    const editorRef = useRef(null);

    const handleSave = () => {
        if (editorRef.current) {
            onSave(content);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-xl p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold mb-4">Modifier la description</h2>

                <div className="mb-6">
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={content}
                        onEditorChange={(newContent) => setContent(newContent)}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic underline | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm font-medium transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-primary hover:bg-orange-600 text-black rounded-lg text-sm font-medium transition"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}
