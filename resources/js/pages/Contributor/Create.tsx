import Layout from '@/layouts/Layout';
import { useForm } from '@inertiajs/react';
import { Button, Input, Label, Textarea, Dropdown, Option } from '@fluentui/react-components';
import { FormEvent, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
    name_oromo?: string;
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

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .green-focus .fui-Input__input:focus,
            .green-focus .fui-Input__input:focus-visible,
            .green-focus .fui-Textarea__textarea:focus,
            .green-focus .fui-Textarea__textarea:focus-visible,
            .green-focus .fui-Dropdown button:focus,
            .green-focus .fui-Dropdown button:focus-visible {
                border-bottom-color: #228b22 !important;
                outline-color: #228b22 !important;
            }
            .green-focus::after {
                border-bottom-color: #228b22 !important;
                background-color: #228b22 !important;
            }
            .green-focus:focus-within::after {
                border-bottom-color: #228b22 !important;
                background-color: #228b22 !important;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contributor/store', {
            forceFormData: true,
        });
    };

    return (
        <Layout title="Add New Word - Afaan Oromo Picture Dictionary">
            <div style={{ 
                maxWidth: '700px', 
                margin: '0 auto', 
                padding: '1rem',
            }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: 'clamp(1rem, 4vw, 2.5rem)'
            }}>
                <h1 style={{ 
                    color: '#dc143c', 
                    marginBottom: '0.5rem',
                    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                    fontWeight: 'bold'
                }}>Add New Word</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    Contribute to the Afaan Oromo dictionary by adding a new word
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <Label required style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Category</Label>
                        <Dropdown
                            placeholder="Select a category"
                            value={data.category_id ? categories.find(cat => cat.id.toString() === data.category_id)?.name : ''}
                            onOptionSelect={(_, data) => setData('category_id', data.optionValue || '')}
                            style={{ width: '100%' }}
                            className="green-focus"
                        >
                            {categories.map((cat) => (
                                <Option key={cat.id} value={cat.id.toString()}>
                                    {cat.name} {cat.name_oromo && `(${cat.name_oromo})`}
                                </Option>
                            ))}
                        </Dropdown>
                        {errors.category_id && <span style={{ color: '#dc143c', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.category_id}</span>}
                    </div>

                    <div>
                        <Label required style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Oromo Word</Label>
                        <Input
                            value={data.word_oromo}
                            onChange={(e) => setData('word_oromo', e.target.value)}
                            required
                            style={{ width: '100%' }}
                            className="green-focus"
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
                            className="green-focus"
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
                            className="green-focus"
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
                        <Label required style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Audio (mp3, wav, or ogg - max 5MB)</Label>
                        <input
                            type="file"
                            accept=".mp3,.wav,.ogg,audio/mpeg,audio/wav,audio/ogg"
                            onChange={(e) => setData('audio', e.target.files?.[0] || null)}
                            required
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
                            fontWeight: '600',
                            width: '100%'
                        }}
                    >
                        {processing ? 'Submitting...' : 'Submit Contribution'}
                    </Button>
                </form>
            </div>
            </div>
        </Layout>
    );
}
