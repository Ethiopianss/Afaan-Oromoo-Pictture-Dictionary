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
        <Layout>
            <h1 style={{ fontSize: '2rem', color: '#dc143c', marginBottom: '2rem', textAlign: 'center' }}>
                Browse Categories
            </h1>
            <div
                style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    padding: '0 1rem',
                }}
            >
                {categories.map((category) => (
                    <Link key={category.id} href={`/categories/${category.id}`}>
                        <Card
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                border: '2px solid #228b22',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                height: '100%',
                                minHeight: '200px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ fontSize: '3rem' }}>{categoryIcons[category.id]}</div>
                            <Text weight="bold" size={500} style={{ color: '#000', whiteSpace: 'nowrap' }}>
                                {category.name}
                            </Text>
                            <Text size={300} style={{ color: '#666' }}>
                                {category.words_count} words
                            </Text>
                        </Card>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}
