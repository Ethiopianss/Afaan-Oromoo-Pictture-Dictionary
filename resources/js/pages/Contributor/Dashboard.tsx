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
            <div style={{ padding: '1rem' }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <h1 style={{ color: '#dc143c', fontSize: 'clamp(1.5rem, 5vw, 2rem)', margin: 0 }}>Contributor Dashboard</h1>
                    <div className="add-word-btn-wrapper">
                        <Link href="/contributor/create">
                            <Button appearance="primary" style={{ backgroundColor: '#228b22' }}>
                                Add New Word
                            </Button>
                        </Link>
                    </div>
                </div>

                {contributions.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                        No contributions yet. Start by adding a new word!
                    </p>
                ) : (
                    <div style={{ 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        overflow: 'hidden'
                    }}>
                        {contributions.map((contribution, index) => (
                            <div 
                                key={contribution.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderBottom: index < contributions.length - 1 ? '1px solid #e0e0e0' : 'none'
                                }}
                            >
                                {contribution.image_path && (
                                    <img 
                                        src={contribution.image_path.startsWith('/storage/') ? contribution.image_path : `/storage/${contribution.image_path}`}
                                        alt={contribution.word_oromo}
                                        style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            objectFit: 'cover', 
                                            borderRadius: '4px',
                                            flexShrink: 0
                                        }}
                                    />
                                )}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <strong style={{ fontSize: '1rem' }}>{contribution.word_oromo}</strong>
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
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>{contribution.word_english}</div>
                                    <div style={{ color: '#999', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                        {contribution.category.name} • {new Date(contribution.created_at).toLocaleDateString()}
                                    </div>
                                    {contribution.status === 'rejected' && contribution.rejection_reason && (
                                        <div style={{ color: '#dc143c', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                            <strong>Reason:</strong> {contribution.rejection_reason}
                                        </div>
                                    )}
                                </div>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '4px',
                                    backgroundColor: getStatusColor(contribution.status),
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    flexShrink: 0
                                }}>
                                    {contribution.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
