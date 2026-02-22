import { Link, useForm } from '@inertiajs/react';
import { Input, Button, Card, Text } from '@fluentui/react-components';
import Layout from '../../layouts/Layout';
import { useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .green-focus .fui-Input__input:focus,
            .green-focus .fui-Input__input:focus-visible {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <Layout title="Register - Afaan Oromo Picture Dictionary">
            <div style={{ 
                minHeight: '80vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                padding: 'clamp(1rem, 3vw, 2rem) 1rem'
            }}>
                <Card style={{ 
                    padding: 'clamp(1.5rem, 4vw, 3rem)', 
                    maxWidth: '450px', 
                    width: '100%',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '1px solid #e0e0e0'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ 
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
                            color: '#dc143c', 
                            marginBottom: '0.5rem',
                            fontWeight: 'bold'
                        }}>
                            Join Us
                        </h1>
                        <Text style={{ color: '#666', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                            Create your account to start learning
                        </Text>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                Full Name
                            </label>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                style={{ 
                                    width: '100%',
                                    padding: '0.75rem',
                                    fontSize: '1rem'
                                }}
                                placeholder="Enter your full name"
                                className="green-focus"
                            />
                            {errors.name && (
                                <Text size={200} style={{ 
                                    color: '#dc143c', 
                                    display: 'block', 
                                    marginTop: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    {errors.name}
                                </Text>
                            )}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                Email Address
                            </label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                style={{ 
                                    width: '100%',
                                    padding: '0.75rem',
                                    fontSize: '1rem'
                                }}
                                placeholder="Enter your email"
                                className="green-focus"
                            />
                            {errors.email && (
                                <Text size={200} style={{ 
                                    color: '#dc143c', 
                                    display: 'block', 
                                    marginTop: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    {errors.email}
                                </Text>
                            )}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                Password
                            </label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                style={{ 
                                    width: '100%',
                                    padding: '0.75rem',
                                    fontSize: '1rem'
                                }}
                                placeholder="Create a password"
                                className="green-focus"
                            />
                            {errors.password && (
                                <Text size={200} style={{ 
                                    color: '#dc143c', 
                                    display: 'block', 
                                    marginTop: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    {errors.password}
                                </Text>
                            )}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                style={{ 
                                    width: '100%',
                                    padding: '0.75rem',
                                    fontSize: '1rem'
                                }}
                                placeholder="Confirm your password"
                                className="green-focus"
                            />
                        </div>

                        <Button
                            appearance="primary"
                            type="submit"
                            disabled={processing}
                            style={{ 
                                width: '100%', 
                                backgroundColor: '#228b22',
                                padding: '0.875rem',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: processing ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {processing ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div style={{ 
                        marginTop: '2rem', 
                        textAlign: 'center',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid #e0e0e0'
                    }}>
                        <Text style={{ fontSize: '1rem', color: '#666' }}>
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                style={{ 
                                    color: '#dc143c', 
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}
                            >
                                Sign In
                            </Link>
                        </Text>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}
