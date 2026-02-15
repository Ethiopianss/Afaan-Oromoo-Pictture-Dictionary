import { Card, Text } from '@fluentui/react-components';
import { Speaker224Regular } from '@fluentui/react-icons';
import Layout from '../../layouts/Layout';
import { usePage, Link } from '@inertiajs/react';
import { useRef } from 'react';

interface Word {
    id: number;
    word_oromo: string;
    word_english: string;
    definition: string;
    image_path: string;
    audio_path: string;
}

interface Category {
    id: number;
    name: string;
    name_oromo: string;
    words: Word[];
}

export default function Show({ category }: { category: Category }) {
    const { auth } = usePage().props as any;

    const playAudio = (audioPath: string) => {
        const audio = new Audio(audioPath);
        audio.play().catch(err => console.error('Audio playback failed:', err));
    };

    return (
        <Layout title={`${category.name} - Afaan Oromo Picture Dictionary`}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', color: '#dc143c', marginBottom: '0.5rem' }}>
                    {category.name}
                </h1>
                <Text size={500} style={{ color: '#228b22' }}>
                    {category.name_oromo}
                </Text>
            </div>

            <div
                style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridAutoRows: 'min-content',
                    alignItems: 'start'
                }}
                className="category-words-grid"
            >
                {category.words.map((word) => (
                    <Card 
                        key={word.id} 
                        style={{ 
                            padding: '1.5rem',
                            height: 'fit-content',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        {auth?.user && word.image_path && (
                            <img
                                src={word.image_path.startsWith('/storage/') ? word.image_path : `/storage/${word.image_path}`}
                                alt={word.word_oromo}
                                style={{ 
                                    width: '100%', 
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '1rem'
                                }}
                            />
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Text weight="bold" size={600} style={{ color: '#dc143c' }}>
                                {word.word_oromo}
                            </Text>
                            {auth?.user && word.audio_path && (
                                <button
                                    onClick={() => playAudio(word.audio_path)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#228b22'
                                    }}
                                    title="Play pronunciation"
                                >
                                    <Speaker224Regular />
                                </button>
                            )}
                        </div>
                        <Text size={500} style={{ color: '#333', marginBottom: '0.5rem' }}>
                            {word.word_english}
                        </Text>
                        {word.definition && (
                            <Text size={400} style={{ color: '#666', marginTop: '0.5rem', lineHeight: '1.5' }}>
                                {word.definition}
                            </Text>
                        )}
                        {!auth?.user && (
                            <Link href="/login" style={{ textDecoration: 'none' }}>
                                <Text
                                    size={300}
                                    style={{ 
                                        display: 'block', 
                                        marginTop: '1rem', 
                                        color: '#228b22',
                                        fontStyle: 'italic',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Login to view pictures and audio
                                </Text>
                            </Link>
                        )}
                    </Card>
                ))}
            </div>
        </Layout>
    );
}
