import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Input, Button, Card, Text } from '@fluentui/react-components';
import Layout from '../../layouts/Layout';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <Layout>
            <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
                <Card style={{ padding: '2rem' }}>
                    <h1 style={{ fontSize: '1.75rem', color: '#dc143c', marginBottom: '1.5rem' }}>
                        Login
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Email</label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                style={{ width: '100%' }}
                            />
                            {errors.email && (
                                <Text size={200} style={{ color: '#dc143c', display: 'block', marginTop: '0.25rem' }}>
                                    {errors.email}
                                </Text>
                            )}
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                Password
                            </label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                style={{ width: '100%' }}
                            />
                            {errors.password && (
                                <Text size={200} style={{ color: '#dc143c', display: 'block', marginTop: '0.25rem' }}>
                                    {errors.password}
                                </Text>
                            )}
                        </div>

                        <Button
                            appearance="primary"
                            type="submit"
                            disabled={processing}
                            style={{ width: '100%', backgroundColor: '#228b22', marginTop: '0.5rem' }}
                        >
                            Login
                        </Button>
                    </form>

                    <Text size={300} style={{ marginTop: '1.5rem', display: 'block', textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link href="/register" style={{ color: '#dc143c' }}>
                            Register
                        </Link>
                    </Text>
                </Card>
            </div>
        </Layout>
    );
}

