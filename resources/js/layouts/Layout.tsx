import { Link, usePage, router } from '@inertiajs/react';
import {
    FluentProvider,
    webLightTheme,
    Button,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
} from '@fluentui/react-components';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import { ReactNode, useState, useEffect } from 'react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title = 'Afaan Oromo Picture Dictionary' }: LayoutProps) {
    const { auth } = usePage().props as any;
    const [isHovered, setIsHovered] = useState(false);
    const [loginHovered, setLoginHovered] = useState(false);
    const [registerHovered, setRegisterHovered] = useState(false);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <FluentProvider theme={webLightTheme}>
            <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
                <nav
                    style={{
                        backgroundColor: '#dc143c',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}
                >
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span style={{
                            color: 'white',
                            fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            Afaan <img src="/Afaan-Oromoo-logo.png" alt="Oromoo Logo" style={{ height: 'clamp(30px, 8vw, 40px)' }} /> Picture Dictionary
                        </span>
                    </Link>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Link href="/categories">
                            <Button 
                                appearance="subtle" 
                                style={{ color: 'white' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                            >
                                Categories
                            </Button>
                        </Link>
                        {auth?.user ? (
                            <>
                                <Link href="/quiz">
                                    <Button 
                                        appearance="subtle" 
                                        style={{ color: 'white' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                                    >
                                        Quiz
                                    </Button>
                                </Link>
                                {(auth.user.role === 'contributor' || auth.user.role === 'admin') && (
                                    <Link href="/contributor/dashboard">
                                        <Button 
                                            appearance="subtle" 
                                            style={{ color: 'white' }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                                        >
                                            Contribute
                                        </Button>
                                    </Link>
                                )}
                                {auth.user.role === 'admin' && (
                                    <Link href="/admin/dashboard">
                                        <Button 
                                            appearance="subtle" 
                                            style={{ color: 'white' }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>
                                )}
                                <Menu>
                                    <MenuTrigger>
                                        <Button 
                                            appearance="subtle" 
                                            style={{ color: 'white' }} 
                                            icon={<ChevronDown20Regular />} 
                                            iconPosition="after"
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                                        >
                                            {auth.user.name}
                                        </Button>
                                    </MenuTrigger>
                                    <MenuPopover>
                                        <MenuList>
                                            <MenuItem>
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        width: '100%',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    Logout
                                                </Link>
                                            </MenuItem>
                                        </MenuList>
                                    </MenuPopover>
                                </Menu>
                            </>
                        ) : (
                            <Menu openOnHover hoverDelay={0}>
                                <MenuTrigger>
                                    <Button 
                                        appearance="transparent"
                                        style={{ color: 'white', padding: '8px', backgroundColor: 'transparent' }}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <div style={{ width: '20px', height: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <span style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '2px',
                                                backgroundColor: 'white',
                                                transition: 'transform 0.3s ease, opacity 0.3s ease',
                                                transform: isHovered ? 'translateY(7px) rotate(45deg)' : 'none'
                                            }} />
                                            <span style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '2px',
                                                backgroundColor: 'white',
                                                transition: 'opacity 0.3s ease',
                                                opacity: isHovered ? 0 : 1
                                            }} />
                                            <span style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '2px',
                                                backgroundColor: 'white',
                                                transition: 'transform 0.3s ease, opacity 0.3s ease',
                                                transform: isHovered ? 'translateY(-7px) rotate(-45deg)' : 'none'
                                            }} />
                                        </div>
                                    </Button>
                                </MenuTrigger>
                                <MenuPopover>
                                    <MenuList>
                                        <MenuItem 
                                            onClick={() => router.visit('/login')}
                                            onMouseEnter={() => setLoginHovered(true)}
                                            onMouseLeave={() => setLoginHovered(false)}
                                            style={{ color: loginHovered ? '#228b22' : 'inherit' }}
                                        >
                                            Login
                                        </MenuItem>
                                        <MenuItem 
                                            onClick={() => router.visit('/register')}
                                            onMouseEnter={() => setRegisterHovered(true)}
                                            onMouseLeave={() => setRegisterHovered(false)}
                                            style={{ color: registerHovered ? '#228b22' : 'inherit' }}
                                        >
                                            Register
                                        </MenuItem>
                                    </MenuList>
                                </MenuPopover>
                            </Menu>
                        )}
                    </div>
                </nav>
                <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', flex: '1', marginBottom: '2rem' }}>
                    {children}
                </main>
                <footer style={{
                    backgroundColor: '#dc143c',
                    color: 'white',
                    padding: '1.5rem 1rem',
                    marginTop: 'auto',
                    textAlign: 'center'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                        <a href="https://github.com/Ethiopianss" target="_blank" rel="noopener noreferrer" 
                           style={{ color: 'white', transition: 'color 0.3s' }}
                           onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                           onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/yazeed-mahad-741879245" target="_blank" rel="noopener noreferrer"
                           style={{ color: 'white', transition: 'color 0.3s' }}
                           onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                           onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a href="https://x.com/Yad82005169" target="_blank" rel="noopener noreferrer"
                           style={{ color: 'white', transition: 'color 0.3s' }}
                           onMouseEnter={(e) => e.currentTarget.style.color = '#228b22'}
                           onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} Afaan Oromo Picture Dictionary. All rights reserved.
                    </p>
                </footer>
            </div>
        </FluentProvider>
    );
}
