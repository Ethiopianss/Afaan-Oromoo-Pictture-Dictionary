import { useEffect, useState } from 'react';

interface Word {
    word_oromo: string;
    word_english: string;
    image_path?: string;
}

export default function WordSlider({ words }: { words: Word[] }) {
    const [current, setCurrent] = useState(0);
    const [lastIndex, setLastIndex] = useState(-1);

    useEffect(() => {
        if (words.length === 0) return;
        const timer = setInterval(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * words.length);
            } while (randomIndex === lastIndex && words.length > 1);
            
            setLastIndex(randomIndex);
            setCurrent(randomIndex);
        }, 3500);
        return () => clearInterval(timer);
    }, [words.length, lastIndex]);

    if (words.length === 0) return null;

    return (
        <div style={{ position: 'relative', marginBottom: '2rem', paddingTop: '2rem', overflow: 'hidden' }}>
            <div style={{
                background: 'linear-gradient(135deg, #dc143c 0%, #228b22 100%)',
                padding: '3rem 1rem 2rem',
                marginLeft: '1rem',
                marginRight: '1rem',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'visible',
                minHeight: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {words.map((word, idx) => (
                <div
                    key={idx}
                    style={{
                        position: 'absolute',
                        opacity: idx === current ? 1 : 0,
                        transform: `scale(${idx === current ? 1 : 0.8}) rotateY(${idx === current ? 0 : 90}deg)`,
                        transition: 'all 0.8s ease-in-out',
                        textAlign: 'center',
                        color: 'white',
                        width: '100%',
                        padding: '0 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        top: '-2rem'
                    }}
                >
                    {word.image_path && (
                        <img
                            src={word.image_path}
                            alt={word.word_oromo}
                            style={{
                                width: 'clamp(200px, 40vw, 300px)',
                                height: 'clamp(150px, 30vw, 200px)',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '4px solid white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}
                        />
                    )}
                    <div>
                        <div style={{
                            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            {word.word_oromo}
                        </div>
                        <div style={{
                            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                            opacity: 0.95,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}>
                            {word.word_english}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}
