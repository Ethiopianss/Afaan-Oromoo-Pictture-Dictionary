import { useState } from 'react';
import { Input, Button, Card, Text, Spinner } from '@fluentui/react-components';
import { Search24Regular } from '@fluentui/react-icons';
import Layout from '../layouts/Layout';
import { usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage().props as any;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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
        <Layout>
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
                    style={{ width: '100%' }}
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
                            <Text weight="bold" size={500} style={{ color: '#dc143c' }}>
                                {word.word_oromo}
                            </Text>
                            <Text size={400} style={{ display: 'block', marginTop: '0.5rem' }}>
                                {word.word_english}
                            </Text>
                            <Text size={300} style={{ display: 'block', marginTop: '0.5rem', color: '#228b22' }}>
                                Category: {word.category}
                            </Text>
                            {!auth?.user && (
                                <Text size={200} style={{ display: 'block', marginTop: '1rem', color: '#999' }}>
                                    Login to view pictures and audio
                                </Text>
                            )}
                            {auth?.user && word.image_path && (
                                <img
                                    src={word.image_path}
                                    alt={word.word_oromo}
                                    style={{ width: '100%', marginTop: '1rem', borderRadius: '8px' }}
                                />
                            )}
                            {auth?.user && word.audio_path && (
                                <audio controls style={{ width: '100%', marginTop: '1rem' }}>
                                    <source src={word.audio_path} type="audio/mpeg" />
                                </audio>
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
