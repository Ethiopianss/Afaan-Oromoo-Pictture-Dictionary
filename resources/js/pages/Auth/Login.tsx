import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Input, Button, Card, Text } from '@fluentui/react-components';
import Layout from '../../layouts/Layout';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
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
        post('/login');
    };

    return (
        <Layout title="Login - Afaan Oromo Picture Dictionary">
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
                            Welcome Back
                        </h1>
                        <Text style={{ color: '#666', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                            Sign in to your account
                        </Text>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
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
                                    padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                                }}
                                placeholder="Enter your email"
                                className="green-focus"
                            />
                            {errors.email && (
                                <Text size={200} style={{ 
                                    color: '#dc143c', 
                                    display: 'block', 
                                    marginTop: '0.5rem',
                                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                                }}>
                                    {errors.email}
                                </Text>
                            )}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
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
                                    padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                                }}
                                placeholder="Enter your password"
                                className="green-focus"
                            />
                            {errors.password && (
                                <Text size={200} style={{ 
                                    color: '#dc143c', 
                                    display: 'block', 
                                    marginTop: '0.5rem',
                                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                                }}>
                                    {errors.password}
                                </Text>
                            )}
                        </div>

                        <Button
                            appearance="primary"
                            type="submit"
                            disabled={processing}
                            style={{ 
                                width: '100%', 
                                backgroundColor: '#228b22',
                                padding: 'clamp(0.625rem, 2vw, 0.875rem)',
                                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                                fontWeight: '600',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: processing ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {processing ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>

                    <div style={{ 
                        marginTop: '2rem', 
                        textAlign: 'center',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid #e0e0e0'
                    }}>
                        <Text style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', color: '#666' }}>
                            Don't have an account?{' '}
                            <Link 
                                href="/register" 
                                style={{ 
                                    color: '#dc143c', 
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}
                            >
                                Create Account
                            </Link>
                        </Text>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

