import { Link } from '@inertiajs/react';
import { Card, Text } from '@fluentui/react-components';
import Layout from '../../layouts/Layout';

interface Category {
    id: number;
    name: string;
    name_oromo: string;
    words_count: number;
}

const categoryIcons: Record<number, string> = {
    1: '🐕',
    2: '🍽️',
    3: '👕',
    4: '👨‍👩‍👧‍👦',
    5: '🏠',
    6: '👤',
    7: '🚗',
    8: '📚',
    9: '🌳',
    10: '💼',
};

export default function Index({ categories }: { categories: Category[] }) {
    return (
        <Layout title="Categories - Afaan Oromo Picture Dictionary">
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: '#dc143c', marginBottom: '2rem', textAlign: 'center', padding: '0 1rem' }}>
                Browse Categories
            </h1>
            <div
                style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    padding: '0 1rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {categories.map((category) => (
                    <Link key={category.id} href={`/categories/${category.id}`}>
                        <Card
                            style={{
                                padding: 'clamp(1rem, 3vw, 2rem)',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                border: '2px solid #228b22',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'clamp(0.5rem, 2vw, 1rem)',
                                height: '100%',
                                minHeight: 'clamp(150px, 30vw, 200px)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>{categoryIcons[category.id]}</div>
                            <Text weight="bold" size={500} style={{ color: '#000', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                                {category.name}
                            </Text>
                            <Text size={300} style={{ color: '#666', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>
                                {category.words_count} words
                            </Text>
                        </Card>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}
