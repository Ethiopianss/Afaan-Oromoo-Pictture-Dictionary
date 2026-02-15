import { useState } from 'react';
import { Input, Button, Card, Text, Spinner } from '@fluentui/react-components';
import { Search24Regular, Speaker224Regular } from '@fluentui/react-icons';
import Layout from '../layouts/Layout';
import { usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage().props as any;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const playAudio = (audioPath: string) => {
        const audio = new Audio(audioPath);
        audio.play().catch(err => console.error('Audio playback failed:', err));
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Afaan Oromo Picture Dictionary">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ 
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
                    color: '#dc143c', 
                    marginBottom: '1rem',
                    padding: '0 1rem',
                    lineHeight: '1.3'
                }}>
                    Welcome to Afaan Oromo Picture Dictionary
                </h1>
                <p style={{ 
                    fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
                    color: '#666',
                    padding: '0 1rem'
                }}>
                    Learn Afaan Oromo with pictures, audio, and interactive quizzes
                </p>
            </div>

            <div
                style={{
                    maxWidth: '600px',
                    margin: '0 auto 2rem',
                    padding: '0 1rem',
                }}
            >
                <Input
                    placeholder="Search for a word..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    style={{ width: '100%', borderRadius: '8px' }}
                    contentAfter={
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            style={{
                                background: '#228b22',
                                border: 'none',
                                cursor: loading ? 'default' : 'pointer',
                                padding: '0.5rem 0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                borderRadius: '0 4px 4px 0',
                                transition: 'opacity 0.2s',
                                marginRight: '-12px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            <Search24Regular />
                        </button>
                    }
                />
            </div>

            {loading && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <Spinner />
                </div>
            )}

            {results.length > 0 && (
                <div style={{ 
                    display: 'grid', 
                    gap: '1rem', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                    padding: '0 1rem'
                }}>
                    {results.map((word) => (
                        <Card key={word.id} style={{ padding: '1.5rem' }}>
                            {auth?.user && word.image_path && (
                                <img
                                    src={word.image_path}
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
                            <Text size={300} style={{ color: '#228b22' }}>
                                Category: {word.category}
                            </Text>
                            {!auth?.user && (
                                <Text size={300} style={{ display: 'block', marginTop: '1rem', color: '#999', fontStyle: 'italic' }}>
                                    Login to view pictures and audio
                                </Text>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            {!loading && results.length === 0 && query && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <Text>No results found for "{query}"</Text>
                </div>
            )}
        </Layout>
    );
}
