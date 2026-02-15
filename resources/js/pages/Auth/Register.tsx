import { Link, useForm } from '@inertiajs/react';
import { Input, Button, Card, Text } from '@fluentui/react-components';
import Layout from '../../layouts/Layout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <Layout>
            <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
                <Card style={{ padding: '2rem' }}>
                    <h1 style={{ fontSize: '1.75rem', color: '#dc143c', marginBottom: '1.5rem' }}>
                        Register
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Name</label>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                style={{ width: '100%' }}
                            />
                            {errors.name && (
                                <Text size={200} style={{ color: '#dc143c', display: 'block', marginTop: '0.25rem' }}>
                                    {errors.name}
                                </Text>
                            )}
                        </div>

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

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <Button
                            appearance="primary"
                            type="submit"
                            disabled={processing}
                            style={{ width: '100%', backgroundColor: '#228b22', marginTop: '0.5rem' }}
                        >
                            Register
                        </Button>
                    </form>

                    <Text size={300} style={{ marginTop: '1.5rem', display: 'block', textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: '#dc143c' }}>
                            Login
                        </Link>
                    </Text>
                </Card>
            </div>
        </Layout>
    );
}
