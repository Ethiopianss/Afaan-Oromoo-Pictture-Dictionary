import Layout from '@/layouts/Layout';
import { router } from '@inertiajs/react';
import { Button, Card, Input, Textarea } from '@fluentui/react-components';
import { useState } from 'react';

interface Contribution {
    id: number;
    word_oromo: string;
    word_english: string;
    status: string;
    user: { name: string };
    category: { name: string };
    created_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Word {
    id: number;
    word_oromo: string;
    word_english: string;
    category: { name: string };
}

export default function Dashboard({ contributions, users, words }: { contributions: Contribution[]; users: User[]; words: Word[] }) {
    const [rejectionReason, setRejectionReason] = useState<{ [key: number]: string }>({});

    const handleApprove = (id: number) => {
        router.post(`/admin/contributions/${id}/approve`);
    };

    const handleReject = (id: number) => {
        if (!rejectionReason[id]) {
            alert('Please provide a rejection reason');
            return;
        }
        router.post(`/admin/contributions/${id}/reject`, {
            rejection_reason: rejectionReason[id]
        });
    };

    const handleRoleChange = (userId: number, role: string) => {
        router.post(`/admin/users/${userId}/role`, { role });
    };

    const handleDeleteUser = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/admin/users/${userId}`);
        }
    };

    const handleDeleteWord = (wordId: number) => {
        if (confirm('Are you sure you want to delete this word?')) {
            router.delete(`/admin/words/${wordId}`);
        }
    };

    return (
        <Layout>
            <div style={{ padding: '0 2rem' }}>
                <h1 style={{ color: '#dc143c', fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h1>

                <h2 style={{ color: '#228b22', fontSize: '1.5rem', marginBottom: '1rem' }}>Pending Contributions</h2>
                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                    {contributions.filter(c => c.status === 'pending').map((contribution) => (
                        <Card key={contribution.id} style={{ padding: '2rem' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#000' }}>
                                    {contribution.word_oromo} - {contribution.word_english}
                                </h3>
                                <p style={{ color: '#666', margin: '0.75rem 0', fontSize: '1rem' }}>
                                    <span style={{ color: '#228b22' }}>Category:</span> {contribution.category.name} | <span style={{ color: '#228b22' }}>Submitted by:</span> {contribution.user.name}
                                </p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1, minWidth: '300px' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                            Rejection reason (optional)
                                        </label>
                                        <Textarea
                                            placeholder="Enter reason for rejection..."
                                            value={rejectionReason[contribution.id] || ''}
                                            onChange={(e) => setRejectionReason({ ...rejectionReason, [contribution.id]: e.target.value })}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <Button
                                            appearance="primary"
                                            style={{ backgroundColor: '#228b22', padding: '0.75rem 1.5rem' }}
                                            onClick={() => handleApprove(contribution.id)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            style={{ backgroundColor: '#dc143c', color: 'white', padding: '0.75rem 1.5rem' }}
                                            onClick={() => handleReject(contribution.id)}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {contributions.filter(c => c.status === 'pending').length === 0 && (
                        <Card style={{ padding: '2rem', textAlign: 'center' }}>
                            <p style={{ color: '#666', margin: 0, fontSize: '1rem' }}>No pending contributions</p>
                        </Card>
                    )}
                </div>

                <h2 style={{ color: '#228b22', fontSize: '1.5rem', marginBottom: '1rem' }}>User Management</h2>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                    {users.map((user) => (
                        <Card key={user.id} style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{user.name}</h3>
                                    <p style={{ color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' }}>{user.email}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: 'auto' }}>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        style={{ 
                                            padding: '0.5rem', 
                                            borderRadius: '4px', 
                                            border: '1px solid #ccc',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <option value="learner">Learner</option>
                                        <option value="contributor">Contributor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <Button
                                        style={{ backgroundColor: '#dc143c', color: 'white' }}
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <h2 style={{ color: '#228b22', fontSize: '1.5rem', marginBottom: '1rem' }}>All Words</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {words.map((word) => (
                        <Card key={word.id} style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{word.word_oromo} - {word.word_english}</h3>
                                    <p style={{ color: '#666', margin: '0.5rem 0', fontSize: '0.9rem' }}>
                                        <span style={{ color: '#228b22' }}>Category:</span> {word.category.name}
                                    </p>
                                </div>
                                <Button
                                    style={{ backgroundColor: '#dc143c', color: 'white', marginLeft: 'auto' }}
                                    onClick={() => handleDeleteWord(word.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
