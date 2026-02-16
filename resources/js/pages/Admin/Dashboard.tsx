import Layout from '@/layouts/Layout';
import { router } from '@inertiajs/react';
import { Button, Input, Textarea } from '@fluentui/react-components';
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
        const user = users.find(u => u.id === userId);
        if (confirm(`Are you sure you want to delete user "${user?.name}" (${user?.email})?\n\nThis action cannot be undone.`)) {
            router.delete(`/admin/users/${userId}`);
        }
    };

    const handleDeleteWord = (wordId: number) => {
        const word = words.find(w => w.id === wordId);
        if (confirm(`Are you sure you want to delete the word "${word?.word_oromo} - ${word?.word_english}"?\n\nThis action cannot be undone.`)) {
            router.delete(`/admin/words/${wordId}`);
        }
    };

    return (
        <Layout title="Admin Dashboard - Afaan Oromo Picture Dictionary">
            <div>
                <h1 style={{ color: '#dc143c', fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h1>

                <h2 style={{ color: '#228b22', fontSize: '1.5rem', marginBottom: '1rem' }}>Pending Contributions</h2>
                {contributions.filter(c => c.status === 'pending').length === 0 ? (
                    <div style={{ 
                        padding: '2rem', 
                        textAlign: 'center', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px',
                        marginBottom: '3rem'
                    }}>
                        <p style={{ color: '#666', margin: 0, fontSize: '1rem' }}>No pending contributions</p>
                    </div>
                ) : (
                    <div style={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '3rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 150px 120px 200px',
                            gap: '1rem',
                            padding: '1rem',
                            backgroundColor: '#f5f5f5',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #e0e0e0'
                        }}>
                            <div>Word & Details</div>
                            <div>Category</div>
                            <div>Contributor</div>
                            <div>Actions</div>
                        </div>
                        {contributions.filter(c => c.status === 'pending').map((contribution) => (
                            <div 
                                key={contribution.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 150px 120px 200px',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderBottom: '1px solid #f0f0f0',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                        {contribution.word_oromo} - {contribution.word_english}
                                    </div>
                                    <Textarea
                                        placeholder="Rejection reason..."
                                        value={rejectionReason[contribution.id] || ''}
                                        onChange={(e) => setRejectionReason({ ...rejectionReason, [contribution.id]: e.target.value })}
                                        style={{ width: '100%', fontSize: '0.9rem' }}
                                        size="small"
                                    />
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                    {contribution.category.name}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                    {contribution.user.name}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button
                                        appearance="primary"
                                        size="small"
                                        style={{ backgroundColor: '#228b22' }}
                                        onClick={() => handleApprove(contribution.id)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="small"
                                        style={{ backgroundColor: '#dc143c', color: 'white' }}
                                        onClick={() => handleReject(contribution.id)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <h2 style={{ color: '#228b22', fontSize: '1.5rem', marginBottom: '1rem' }}>User Management</h2>
                <div style={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 200px 120px 100px',
                        gap: '1rem',
                        padding: '1rem',
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        <div>User</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Action</div>
                    </div>
                    {users.map((user) => (
                        <div 
                            key={user.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 200px 120px 100px',
                                gap: '1rem',
                                padding: '1rem',
                                borderBottom: '1px solid #f0f0f0',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ fontWeight: '500' }}>
                                {user.name}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                {user.email}
                            </div>
                            <div>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    style={{ 
                                        padding: '0.25rem', 
                                        borderRadius: '4px', 
                                        border: '1px solid #ccc',
                                        fontSize: '0.9rem',
                                        width: '100%'
                                    }}
                                >
                                    <option value="learner">Learner</option>
                                    <option value="contributor">Contributor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <Button
                                    size="small"
                                    style={{ backgroundColor: '#dc143c', color: 'white' }}
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 style={{ color: '#228b22', fontSize: '1.5rem', marginBottom: '1rem' }}>All Words</h2>
                <div style={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 150px 100px',
                        gap: '1rem',
                        padding: '1rem',
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        <div>Word</div>
                        <div>Category</div>
                        <div>Action</div>
                    </div>
                    {words.map((word) => (
                        <div 
                            key={word.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 150px 100px',
                                gap: '1rem',
                                padding: '1rem',
                                borderBottom: '1px solid #f0f0f0',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ fontWeight: '500' }}>
                                {word.word_oromo} - {word.word_english}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                {word.category.name}
                            </div>
                            <div>
                                <Button
                                    size="small"
                                    style={{ backgroundColor: '#dc143c', color: 'white' }}
                                    onClick={() => handleDeleteWord(word.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
