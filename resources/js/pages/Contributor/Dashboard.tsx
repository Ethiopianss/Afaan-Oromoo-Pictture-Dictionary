import Layout from '@/layouts/Layout';
import { Link } from '@inertiajs/react';
import { Button, Card } from '@fluentui/react-components';
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
        <Layout>
            <div style={{ padding: '0 2rem' }}>
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

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {contributions.map((contribution) => (
                        <Card key={contribution.id} style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                                {contribution.image_path && (
                                    <img 
                                        src={contribution.image_path.startsWith('/storage/') ? contribution.image_path : `/storage/${contribution.image_path}`}
                                        alt={contribution.word_oromo}
                                        style={{ 
                                            width: '100px', 
                                            height: '100px', 
                                            objectFit: 'cover', 
                                            borderRadius: '8px'
                                        }}
                                    />
                                )}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                                            {contribution.word_oromo} - {contribution.word_english}
                                        </h3>
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
                                    <p style={{ color: '#666', margin: '0.5rem 0' }}>
                                        Category: {contribution.category.name}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.25rem 0' }}>
                                        Submitted: {new Date(contribution.created_at).toLocaleDateString()}
                                    </p>
                                    {contribution.status === 'rejected' && contribution.rejection_reason && (
                                        <p style={{ color: '#dc143c', marginTop: '0.5rem' }}>
                                            Reason: {contribution.rejection_reason}
                                        </p>
                                    )}
                                </div>
                                <span style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    backgroundColor: getStatusColor(contribution.status),
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize'
                                }}>
                                    {contribution.status}
                                </span>
                            </div>
                        </Card>
                    ))}
                    {contributions.length === 0 && (
                        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                            No contributions yet. Start by adding a new word!
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
