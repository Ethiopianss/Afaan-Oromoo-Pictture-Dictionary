import Layout from '@/layouts/Layout';
import { Link } from '@inertiajs/react';
import { Button } from '@fluentui/react-components';
import { Speaker224Regular } from '@fluentui/react-icons';

interface Contribution {
    id: number;
    word_oromo: string;
    word_english: string;
    status: 'pending' | 'approved' | 'rejected';
    rejection_reason?: string;
    category: { name: string };
    created_at: string;
    image_path?: string;
    audio_path?: string;
}

export default function Dashboard({ contributions }: { contributions: Contribution[] }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return '#228b22';
            case 'rejected': return '#dc143c';
            default: return '#ffa500';
        }
    };

    const playAudio = (audioPath: string) => {
        const audio = new Audio(audioPath);
        audio.play();
    };

    return (
        <Layout title="Contributor Dashboard - Afaan Oromo Picture Dictionary">
            <div style={{ padding: '2rem 0' }}>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '2rem',
                    gap: '2rem'
                }}>
                    <h1 style={{ color: '#dc143c', fontSize: '2rem', margin: 0, marginRight: 'auto' }}>Contributor Dashboard</h1>
                    <Link href="/contributor/create">
                        <Button appearance="primary" style={{ backgroundColor: '#228b22' }}>
                            Add New Word
                        </Button>
                    </Link>
                </div>

                {contributions.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                        No contributions yet. Start by adding a new word!
                    </p>
                ) : (
                    <div style={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '60px 1fr 150px 120px 100px',
                            gap: '1rem',
                            padding: '1rem',
                            backgroundColor: '#f5f5f5',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #e0e0e0'
                        }}>
                            <div>Image</div>
                            <div>Word</div>
                            <div>Category</div>
                            <div>Date</div>
                            <div>Status</div>
                        </div>
                        {contributions.map((contribution) => (
                            <div 
                                key={contribution.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '60px 1fr 150px 120px 100px',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderBottom: '1px solid #f0f0f0',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    {contribution.image_path && (
                                        <img 
                                            src={contribution.image_path.startsWith('/storage/') ? contribution.image_path : `/storage/${contribution.image_path}`}
                                            alt={contribution.word_oromo}
                                            style={{ 
                                                width: '50px', 
                                                height: '50px', 
                                                objectFit: 'cover', 
                                                borderRadius: '4px'
                                            }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <strong>{contribution.word_oromo}</strong> - {contribution.word_english}
                                        {contribution.audio_path && (
                                            <button
                                                onClick={() => playAudio(contribution.audio_path!)}
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
                                    {contribution.status === 'rejected' && contribution.rejection_reason && (
                                        <div style={{ color: '#dc143c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                            {contribution.rejection_reason}
                                        </div>
                                    )}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                    {contribution.category.name}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                    {new Date(contribution.created_at).toLocaleDateString()}
                                </div>
                                <div>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: getStatusColor(contribution.status),
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize'
                                    }}>
                                        {contribution.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
