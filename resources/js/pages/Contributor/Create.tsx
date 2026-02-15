import Layout from '@/layouts/Layout';
import { useForm } from '@inertiajs/react';
import { Button, Input, Label, Textarea, Select } from '@fluentui/react-components';
import { FormEvent } from 'react';

interface Category {
    id: number;
    name: string;
}

export default function Create({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        word_oromo: '',
        word_english: '',
        definition: '',
        image: null as File | null,
        audio: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contributor/store', {
            forceFormData: true,
        });
    };

    return (
        <Layout>
            <div style={{ 
                maxWidth: '700px', 
                margin: '2rem auto', 
                padding: '2.5rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ 
                    color: '#dc143c', 
                    marginBottom: '0.5rem',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                }}>Add New Word</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    Contribute to the Afaan Oromo dictionary by adding a new word
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <Label required style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Category</Label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                borderRadius: '4px', 
                                border: '1px solid #d1d1d1',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            }}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <span style={{ color: '#dc143c', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.category_id}</span>}
                    </div>

                    <div>
                        <Label required style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Oromo Word</Label>
                        <Input
                            value={data.word_oromo}
                            onChange={(e) => setData('word_oromo', e.target.value)}
                            required
                            style={{ width: '100%' }}
                        />
                        {errors.word_oromo && <span style={{ color: '#dc143c', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.word_oromo}</span>}
                    </div>

                    <div>
                        <Label required style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>English Translation</Label>
                        <Input
                            value={data.word_english}
                            onChange={(e) => setData('word_english', e.target.value)}
                            required
                            style={{ width: '100%' }}
                        />
                        {errors.word_english && <span style={{ color: '#dc143c', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.word_english}</span>}
                    </div>

                    <div>
                        <Label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Definition</Label>
                        <Textarea
                            value={data.definition}
                            onChange={(e) => setData('definition', e.target.value)}
                            rows={3}
                            style={{ width: '100%' }}
                        />
                        {errors.definition && <span style={{ color: '#dc143c', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.definition}</span>}
                    </div>

                    <div>
                        <Label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Image</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                            style={{ 
                                display: 'block', 
                                marginTop: '0.5rem',
                                padding: '0.5rem',
                                border: '1px solid #d1d1d1',
                                borderRadius: '4px',
                                width: '100%',
                                fontSize: '0.95rem'
                            }}
                        />
                        {errors.image && <span style={{ color: '#dc143c', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.image}</span>}
                    </div>

                    <div>
                        <Label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Audio</Label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setData('audio', e.target.files?.[0] || null)}
                            style={{ 
                                display: 'block', 
                                marginTop: '0.5rem',
                                padding: '0.5rem',
                                border: '1px solid #d1d1d1',
                                borderRadius: '4px',
                                width: '100%',
                                fontSize: '0.95rem'
                            }}
                        />
                        {errors.audio && <span style={{ color: '#dc143c', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.audio}</span>}
                    </div>

                    <Button
                        type="submit"
                        appearance="primary"
                        disabled={processing}
                        style={{ 
                            backgroundColor: '#228b22', 
                            marginTop: '1rem',
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        {processing ? 'Submitting...' : 'Submit Contribution'}
                    </Button>
                </form>
            </div>
        </Layout>
    );
}
